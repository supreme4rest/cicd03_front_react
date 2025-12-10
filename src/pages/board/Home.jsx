import { useContext, useEffect, useState } from "react";
import BoardItem from "../../components/BoardItem";
import "./Home.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";




const Home =()=>{
  const serverIp = import.meta.env.VITE_API_SERVER_IP;
 //console.log("serverIp = "+serverIp)

  const { handleLoginChange} = useContext(LoginContext);

  

   //DB 목록을 저장해서 관리 할 useState
   const [boards , setBoards] = useState([]);

   const nav = useNavigate();

     //서버에서 데이터 조회   - axios
     useEffect(()=>{
        axios
        //.get("http://3.34.71.73:9000/boards", {
          .get(serverIp+"/boards", {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },})
        .then((res)=>{
           // console.log(res);

           setBoards(res.data);//state에서 관리되는 변수가 변경되어 update(re-rendering)
        })
        .catch((err)=>{
            console.log(err)
            /*if(err.response.status===403){
               localStorage.clear();//모든 세션의 정보 지우기

               handleLoginChange(false);
               alert("로그인하고 이용해주세요.");
               nav("/loginForm");
            }else{
                alert(err.response.data.detail) ; 
            }*/
               
       }); 
     }, []);


    return (
      <div className="Home">
       <h1>전체게시물 LIST</h1>
        {
          boards.map( (board)=> <BoardItem key={board.id} board={board}/> )
        }   

      </div>
    )
  }
  
  export default Home;