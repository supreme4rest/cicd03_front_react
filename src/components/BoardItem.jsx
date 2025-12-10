import { Link, useNavigate } from "react-router-dom";
import "./BoardItem.css";
import Button from "./Button";
const BoardItem =( {board} )=>{
  //console.log(board);

  const nav= useNavigate();
  const check = ()=>{
     if(localStorage.getItem("id")){
        nav("/board/"+board.id)
     }else{
        alert("로그인하고 이용해주세요.");
        nav("/loginForm")
     }
  }
  return (
    <div className="BoardItem">
      <div className="title_writer">
        제목 :{board.title}  / 작성자 : ({board.member.name})
        </div>
      <div  className="detailLink">
        <Button  text={"상세보기"} type={"button"} onClick={check} detail={"detail"}/>
      </div>
    </div>
  )
}

export default BoardItem;