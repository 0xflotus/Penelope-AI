// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "../../utils/supabaseAdminClient";
import crypto from "crypto";

type Data = {
  status: string;
  result?: string;
  extension_token?: string;
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient({ req, res });

    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session)
      return res.status(401).json({ status: "error", result: "Unauthorized" });

    const getUserResult = await supabase.auth.getUser();

    if (!getUserResult.data.user)
      return res.status(401).json({ status: "error", result: "Unauthorized" });

    const userId = getUserResult.data.user.id;

    // check if there is already a token for the user
    const extensionTokenFetchResult = await supabase
      .from("users")
      .select("extension_token")
      .eq("id", userId);
    if (
      extensionTokenFetchResult.data !== null &&
      extensionTokenFetchResult.data[0].extension_token !== ""
    )
      return res
        .status(400)
        .json({ status: "success", result: "A token already exists" });

    // Generate Token
    const token = `penelope-${crypto.randomUUID()}`;

    // Save it on DB
    const result = await supabaseAdmin
      .from("users")
      .update({ extension_token: token })
      .eq("id", userId)
      .select("extension_token");

    if (result.data === null) {
      return res.status(500).json({
        status: "error",
        result: "something is wrong",
      });
    }

    res.status(200).json({
      extension_token: result.data[0].extension_token,
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      result: (err as any).message,
    });
  }
};

export default handler;
