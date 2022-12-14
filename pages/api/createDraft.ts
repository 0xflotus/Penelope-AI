// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { supabaseAdmin } from "../../utils/supabaseAdminClient";
import { v4 } from "uuid";

type Data = {
  status?: string;
  result: string;
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
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

  const draftId = v4();

  await supabaseAdmin
    .from("drafts")
    .insert({
      id: draftId,
      user_id: getUserResult.data.user.id,
      content: "",
    })
    .select();

  res.status(200).json({ result: draftId });
};

export default handler;
