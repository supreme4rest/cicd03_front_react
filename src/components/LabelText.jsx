import { useEffect, useState } from "react";
import "./LabelText.css"

/*
  props정보
    text : label글씨
    name : input 요소 name값
    initValue : input요소의 value 초기값
    changeValue : input 값이 onChange될때 호출 될 함수
    readOnly : inputt요소 readOnly 적용
*/
const LabelText =({text, name, initValue , changeValue , readOnly})=>{
    const [value, setValue] = useState(initValue || ""); //initValue값 falsy(undefined,null,NaN,false,0)이면 ""로 초기값설정
      
     useEffect(()=>{
      readOnly && setValue(localStorage.getItem("name"));
     });

   const onChangeCheck = (e)=>{
     setValue(e.target.value)
     changeValue(e); //부모의  함수를 호출
   }

    return (
        <div className="LabelText" >
            <label className="label">{text}</label>

            { 
             initValue ?  <div> {initValue} </div> 
             :
            <input 
            className={`${initValue ?  'input_disabled':'input'}`} 
            type={`${(name==="password" || name==="pwd") ? "password" : "text"}`} 
             name={name}  
            value={value}
            readOnly={readOnly ? true : undefined} 
            onChange={onChangeCheck} />
         }
        </div>
    )
}
 
  export default LabelText;