import { ConversationSchema } from "../../../../lib/conversation-schema";
import type { ErrorJsonl, ExtendedConversation } from "../../types";

export const parseJsonl = (content: string): ExtendedConversation[] => {
  const lines = content
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== "");

  return lines.map((line, index) => {
    try {
      const jsonData = JSON.parse(line);
      const parsed = ConversationSchema.safeParse(jsonData);
      if (!parsed.success) {
        const errorData: ErrorJsonl = {
          type: "x-error",
          line,
          lineNumber: index + 1,
        };
        return errorData;
      }

      return parsed.data;
    } catch (error) {
      // Handle JSON parsing errors
      console.error(
        `Failed to parse JSONL line ${index + 1}:`,
        error instanceof Error ? error.message : String(error),
      );
      console.error(`Problematic line: ${line.substring(0, 100)}...`);
      const errorData: ErrorJsonl = {
        type: "x-error",
        line,
        lineNumber: index + 1,
      };
      return errorData;
    }
  });
};
