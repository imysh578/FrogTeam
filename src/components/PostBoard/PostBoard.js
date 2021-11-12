import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./PostBoard.css";
import ReactHtmlParser from "react-html-parser";

function App() {
  const [areaContent, setAreaContent] = useState({
    nickname: "",
    content: "",
  });

  const [viewContent, setViewCintent] = useState([]);

  const getValue = (e) => {
    const { name, value } = e.target;
    setAreaContent({
      ...areaContent,
      [name]: value,
    });
    console.log(areaContent);
  };

  return (
    <div className="App">
      <h2 Style="text-align: center">ribbit-ribbit board</h2>
      <input
        className="nickname-input"
        type="text"
        placeholder="닉네임"
        onChange={getValue}
        name="nickname"
      />
      <button
        className="submit-button"
        onClick={() => {
          setViewCintent(viewContent.concat({ ...areaContent }));
        }}
      >
        RIBBIT
      </button>
      <CKEditor
        editor={ClassicEditor}
        data="<p>내용...</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
          setAreaContent({
            ...areaContent,
            content: data,
          });
          console.log(areaContent);
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
      <div className="form-wrapper">
        {viewContent.map((element) => (
          <div
            Style="
            border-style: none none solid none;
            border-width: 2px;
            margin-left : 10px;
            margin-right : 10px;
            border-color: gray;"
          >
            <h4>{element.nickname}</h4>
            <div Style="margin-bottom : 50px">
              {ReactHtmlParser(element.content)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
