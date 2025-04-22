import { useState } from "react";
import EditorComponent from "../../components/EditorComponent";

const Template = () => {
  const [content, setContent] = useState("");

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = () => {
    console.log("Saved content:", content);
  };

  return (
    <div className="flex flex-row gap-4 w-full p-4">
      <div className="w-1/2">
        <EditorComponent onChange={handleEditorChange} />
      </div>
      <div className="w-1/2 border rounded-lg p-4 bg-white shadow">
        <div className="mb-4 font-semibold text-lg">Preview</div>
        <div
          className="min-h-[200px] border p-2 rounded text-sm"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Template
        </button>
      </div>
    </div>
  );
};

export default Template;
