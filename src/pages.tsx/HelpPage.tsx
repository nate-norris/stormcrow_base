import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function HelpPage() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("../docs/help.md")
      .then((res) => res.text())
      .then(setContent);
  }, []);

  return (
    <div className="prose">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}