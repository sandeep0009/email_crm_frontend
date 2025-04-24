import { Editor } from "@tinymce/tinymce-react";

const EditorComponent = ({ onChange }: { onChange: (value: string) => void }) => {
  const handleEditorChange = (content: any) => {
    onChange(content);
  };

  return (
    <Editor
    apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
      init={{
        skin: "snow",
        icons: "thin",
        placeholder: "Ask a question or post an update...",
        height: 400,
        menubar: true,
  
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen textcolor",
          "insertdatetime media table paste code help wordcount",
        ],
        textcolor_rows: "4",
        toolbar:
          "undo redo | styleselect | fontsizeselect | code | bold italic | alignleft aligncenter alignright alignjustify | outdent indent",
      }}
      onEditorChange={handleEditorChange}
    
    />
  );
};

export default EditorComponent;
