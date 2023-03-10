// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { openai } from "../../utils/openAiClient";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

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

  const userInput = req.body.text;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    temperature: 0.7,
    max_tokens: 250,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    prompt: `Create a story from the topic below. It must be easy to understand and highly readable for anyone.:
		${userInput}
		Story:`,
  });

  res.status(200).json({ result: completion.data.choices[0].text ?? "" });
};

export default handler;
