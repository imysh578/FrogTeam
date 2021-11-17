import React, { Component } from "react";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./PostBoard.css";
import ReactHtmlParser from "react-html-parser";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  //초기값
  const [areaContent, setAreaContent] = useState({
    nickname: "",
    content: "",
  });

  const [viewContent, setViewCintent] = useState([]);

  //입력값
  const getValue = (e) => {
    const { name, value } = e.target;
    setAreaContent({
      ...areaContent,
      [name]: value,
    });
    console.log(areaContent);
  };

  // 날짜 출력하는법...?
  // const Date = (d) => {
  //   new this.props.date(this.props.toLocaleDateString);
  //   console.log(d);
  // };

  //날짜및 시간
  //윗쪽 하다가 안 먹어서 좀 고전적인 방법을 사용했습니다. 수정 가능성 有
  const today = new Date();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const hour = ("0" + today.getHours()).slice(-2);
  const minunt = ("0" + today.getMinutes()).slice(-2);

  const dateString = month + "월 " + day + "일 " + hour + " : " + minunt;

  //   //무한스크롤 설정값
  //   class App extends React.Component {
  //     state = {
  //       items: Array.from({ length: 15 }),
  //     };

  //     fetchMoreData = () => {
  //       // 1.5초 딜레이 후 5개의 내용 로드
  //       setTimeout(() => {
  //         this.setState({
  //           items: this.state.items.concat(Array.from({ length: 5 })),
  //         });
  //       }, 1500);
  //     };

  //     //무한스크롤 렌더
  //     render() {
  //       return (
  //         <div>
  //           <hr />
  //           <InfiniteScroll
  //             dataLength={this.state.items.length}
  //             next={this.fetchMoreData}
  //             hasMore={true}
  //             loader={<h4>Loading...</h4>}
  //           >
  //             {this.state.items.map((viewContent) => (
  //               <div key={viewContent}>{viewContent}</div>
  //             ))}
  //           </InfiniteScroll>
  //         </div>
  //       );
  //     }
  //   }

  //여기서부터 출력
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

      {/* 포스트박스 */}
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

      {/* 작성글 출력 */}
      <div className="form-wrapper">
        {/* <App> */}
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
            {dateString}

            <div Style="margin-bottom : 50px">
              {ReactHtmlParser(element.content)}
            </div>
          </div>
        ))}
        {/* </App> */}
      </div>
    </div>
  );
}

export default App;
