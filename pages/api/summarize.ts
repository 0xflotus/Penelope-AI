// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { openai } from "../../utils/openAiClient";

type Data = {
  result: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const userInput = req.body.text;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    temperature: 0.7,
    max_tokens: 250,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    prompt: `Summarize the text below for the Twitter post. It must be easy to understand and highly readable for anyone. No hashtag. Text:
		${userInput}
		Summary:`,
  });

  res.status(200).json({ result: completion.data.choices[0].text ?? "" });
};

export default handler;
