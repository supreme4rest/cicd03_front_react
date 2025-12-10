import Button from "../../components/Button";
import LabelText from "../../components/LabelText";
import React, { useContext, useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../App";



const LoginForm =()=>{
  const serverIp = import.meta.env.VITE_API_SERVER_IP;

  const { handleLoginChange} = useContext(LoginContext); //{isLogin:isLogin , handleLoginChange:handleLoginChange }

  // 인증에 필요한 username, password 상태관리를 위한 useState
  const [member, setMember] = useState({
    username: "",
    password: "",
  });

  // input 에 값이 입력될 때 상태 값 수정
  const changeValue = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  }; //

  const navigator = useNavigate();

  const submitLogin = (e) => {
   
    const formData = new FormData(); //폼전송으로 보내기위한 작업
    formData.append("username", member.username);
    formData.append("password", member.password);

    axios({
        method:"POST",
        url : serverIp+"/login",
        data : formData,
    })
    .then((res)=>{
        console.log("res = " , res)

         //인증된 사용자의 정보를 저장
        localStorage.setItem("memberNo", res.data.memberNo);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("address", res.data.address);

        localStorage.setItem("Authorization", res.headers.authorization);
       
        //App.js에 있는 isLogin 변수를 true 변경한다.
        handleLoginChange(true);

        //Home.jsx로 이동한다.
        navigator("/"); 


    })
    .catch((err)=>{
      alert("정보를 다시 확인해주세요.");

        
    });
     
  }

   const cancelBack=()=>{
    navigator(-1); 
   }


    return (
      <div className="LoginForm">
        <h1 className="h1">로그인</h1>
        <LabelText text={"아이디"} name={"username"}  changeValue={changeValue} />
        <LabelText text={"비밀번호"} name={"password"} changeValue={changeValue} />

        <div className="divBtn">
            <Button text={"로그인"}  type={"button"}  onClick={submitLogin}/>
            <Button text={"취소"}  type={"reset"}  onClick={cancelBack}/>
        </div>
        
      </div>
    )
  }
  
  export default LoginForm;