import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import LabelText from "../../components/LabelText";
import "./Detail.css";
import { useEffect, useState } from "react";
import axios from "axios";



const Detail =()=>{
  const serverIp = import.meta.env.VITE_API_SERVER_IP;
   //파라미터를 받는다.
   const { id } = useParams(); //  /board/:id

   const [board, setBoard] = useState({
     id: "",
     title: "",
     content: "",
     member: {},
     regDate:""
   });
  
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(serverIp +"/boards/" + id, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      .then((res) => {
        console.log(res)
        setBoard(res.data);
      })
      .catch((err) => {
          errFun(err);
      });
  }, []);

  //에러 출력 함수
  const errFun = (err) => {
    if (err.response.status === 403) {
      alert("로그인하고 이용해주세요.");
    } else {
      let errMessage = "오류 = " + err.response.data.type + "\n";
      errMessage += err.response.data.title + "\n";
      errMessage += err.response.data.status + "\n";
      errMessage += err.response.data.instance + "\n";
      errMessage += err.response.data.timestamp;
      alert(errMessage);
    }

    nav("/");
  };

   //삭제
   const deleteBoard = () => {
    axios({
        method:"DELETE",
        headers: {
        Authorization: localStorage.getItem("Authorization"),
        },
        url : serverIp+"/boards/"+id,
        })
        .then((res)=>{
        if(res.data ==="ok")
             nav("/") ;
        else
         alert("삭제되지 않았습니다.");
     })
    .catch((err)=>{
         console.log("err = " + err)
         errFun(err);
    });       
  };//삭제끝

  //수정 클릭
  const updateBoard = () => {
    nav("/updateForm/"+id);

  };

    return (
      <div className="Detail">
       <h1>상세보기</h1>
      
        <LabelText text={"글번호"}  initValue={board.id}/>
        <LabelText text={"제목"}  initValue={board.title}/>
        <LabelText text={"작성자"}  initValue={board.member.name}/>
        <LabelText text={"등록일"}  initValue={board.regDate}/>
  
        <div className="divContent">
          <div className="divContent_label">cotent</div> 
          <textarea className="divContent_textarea" placeholder="오늘은 어땠나요?"
           name="content"  disabled value={board.content}></textarea>
       </div>
      
      { board.member.name === localStorage.getItem("name") &&
       <div className="divBtn">
            <Button text={"수정"}  type={"button"}  onClick={updateBoard}/>
            <Button text={"삭제"}  type={"button"} onClick={deleteBoard} />
        </div>
      }  
      
      </div>
    )
  }
  
  export default Detail;