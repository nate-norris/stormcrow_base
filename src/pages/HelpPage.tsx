import helpContent from "@/docs/help.md?raw";
import ReactMarkdown from "react-markdown";

export default function HelpPage() {
  return (
    <div className="prose">
      <ReactMarkdown>{helpContent}</ReactMarkdown>
    </div>
  );
}