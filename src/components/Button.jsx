import './Button.css';

/*
props정보 
   text:글씨 , 
   type:버튼유형  , 
   onClick:함수 , 
   detail : 상세보기 버튼인경우 디자인 다르게하기 위한 속성
*/
const Button = ({text, type,  onClick , detail })=>{
   
    return (
       <button  type={type} className={`Button Button_${type} ${detail}`}
        onClick={onClick}  >{text}</button>
    )
}

export default Button;

