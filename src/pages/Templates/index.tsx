import { useState } from "react";
import EditorComponent from "../../components/EditorComponent";
import { axiosInstance } from "../../lib/axios";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const Template = () => {
  const [title, setTitle] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleEditorChange = (newContent: string) => {
    setHtmlCode(newContent);
  };

  const handleSave = async () => {
    if (!title || !htmlCode) {
      setMessage("Title and content are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axiosInstance.post("/create-template", {
        title,
        htmlCode,
      });
      setHtmlCode("");
      setTitle("");
      setMessage("Template saved successfully!");

    } catch (error: any) {
      console.error("Error saving template:", error);
      setMessage("Error saving template.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full p-4">
      <div className="md:w-1/2 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Template Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </div>

        <div className="border rounded-md">
        <EditorComponent onChange={handleEditorChange}  />
        </div>
        

      
        
      </div>

      <div className="md:w-1/2 border rounded-lg p-4 bg-white shadow">
        <div className="mb-4 font-semibold text-lg">Preview</div>
        <div
          className="min-h-[200px] border p-2 rounded text-sm"
          dangerouslySetInnerHTML={{ __html: htmlCode }}
        />

        <Button
          onClick={handleSave}
          className="mt-4 flex justify-end"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Template"}
        </Button>

        {message && (
          <p className={`mt-2 text-sm ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Template;
