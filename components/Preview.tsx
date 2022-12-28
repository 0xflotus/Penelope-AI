import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Box } from "@mantine/core";

export const Preview = ({ content }: { content: string }) => {
  return (
    <Box p="md">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
        {content}
      </ReactMarkdown>
    </Box>
  );
};
