import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import LabelText from "../../components/LabelText";
import './UpdateForm.css';
import { useEffect, useState } from "react";
import axios from "axios";



const UpdateForm =()=>{
  const serverIp = import.meta.env.VITE_API_SERVER_IP;

  const { id } = useParams(); //
  const [board, setBoard] = useState({
    title: "",
    content: "",
    member: {},
  });

  //페이지 이동하는 방법
  const navigator = useNavigate();
  
  useEffect(() => {
    axios
      .get(serverIp+"/boards/" + id, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      .then((res) => {
        setBoard(res.data);
      })
      .catch((err) => {
        errFun(err);
      });
  }, []);

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
    navigator("/");
  };

  const changeValue = (e)=>{
     setBoard(
        {...board , 
         [e.target.name] : e.target.value
     })
  }

 const submitBoard = (e)=>{
    axios({
        method:"PUT",
        url : serverIp+"/boards/"+id,
        data : board,
        headers: {
        Authorization: localStorage.getItem("Authorization"),
        }
        })
        .then((res)=>{
           navigator("/board/"+id);

        })
        .catch((err)=>{
           errFun(err);
        });
 };
    return (
      <>
       <h1 className="h1">  수정하기 </h1>
      <form>
       
        <LabelText text={"title"} name={"title"} initValue={board.title} 
        changeValue={changeValue} />
       
        <LabelText text={"writer"} name={"name"}  readOnly="yes"/>
      
        <div className="divContent">
          <div className="divContent_label">cotent</div> 
          <textarea 
          className="divContent_textarea" 
          placeholder="내용을 입력해주세요"
           name="content" 
           value={board.content} 
           onChange={changeValue}></textarea>
       </div>

        <div className="divBtn">
            <Button text={"수정"}  type={"button"}  onClick={submitBoard}/>
            <Button text={"취소"}  type={"reset"} />
        </div>
        </form>
      </>
    )
  }
  
  export default UpdateForm;