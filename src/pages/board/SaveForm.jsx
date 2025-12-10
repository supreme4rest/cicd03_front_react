import { useState } from "react";
import Button from "../../components/Button";
import LabelText from "../../components/LabelText";
import "./SaveForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SaveForm =()=>{
  const serverIp = import.meta.env.VITE_API_SERVER_IP;

  //게시물 상태관리
  const [board, setBoard] = useState({
    title: "",
    content: "",
    memberNo: localStorage.getItem("memberNo"),
  }); //제목, 작성자=memberNo, 내용

  //input 에 값이 변경될 때
  const changeValue = (e) => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };

  //페이지 이동하는 방법
  const navigator = useNavigate();

  //등록하기 클릭
  const submitBoard = (e) => {
    axios({
      method: "POST",
      url: serverIp+"/boards/board",
      data: board,
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        }
    })
      .then((res) => {
        console.log(res);
        navigator("/");
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert("로그인된 사용자만이 글을 등록 할 수 있어요.");
          navigator("/");
        } else {
         alert(err.response.data.detail);
        }
     });
  };

    return (
      <>
      <h1 className="h1">  게시물 등록하기 </h1>
     
        <LabelText text={"title"} name={"title"} changeValue={changeValue}/>
        <LabelText text={"writer"} name={"name"} readOnly={"yes"}/>
     
        <div className="divContent">
          <div className="divContent_label">cotent</div> 
          <textarea className="divContent_textarea" placeholder="내용을 입력해주세요^^"  name="content" onChange={changeValue}></textarea>
       </div>

        <div className="divBtn">
            <Button text={"등록"}  type={"button"}  onClick={submitBoard}/>
            <Button text={"취소"}  type={"reset"}  onClick={()=>navigator(-1)}/>
        </div>
      </>
    )
  }
  
  export default SaveForm;