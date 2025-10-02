'use client';

import { Sandpack } from "@codesandbox/sandpack-react";
import { useState } from "react";

export default function EditorPage() {
  const [files, setFiles] = useState<{ [path: string]: { code: string } }>({
    "/index.html": { code: "<h1>Hello Lovable Clone 🚀</h1>" },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles: { [path: string]: { code: string } } = {};
    if (e.target.files) {
      for (const file of Array.from(e.target.files)) {
        const text = await file.text();
        // Keep relative paths (important for Next/React projects)
        const filePath = "/" + file.webkitRelativePath;
        newFiles[filePath] = { code: text };
      }
      setFiles(newFiles);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
        <input
          type="file"
          webkitdirectory="true"
          directory=""
          multiple
          onChange={handleUpload}
          className="text-white"
        />
      </div>

      <Sandpack
        template="static"
        files={Object.fromEntries(
          Object.entries(files).map(([path, file]) => [path, file.code])
        )}
        options={{
          showTabs: true,
          showLineNumbers: true,
          editorHeight: 600,
          resizablePanels: true,
          showInlineErrors: true,
        }}
        theme="dark"
      />
    </div>
  );
}
