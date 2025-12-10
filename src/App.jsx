
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/board/Home'
import SaveForm from './pages/board/SaveForm'
import Detail from './pages/board/Detail'
import UpdateForm from './pages/board/UpdateForm'
import LoginForm from './pages/user/LoginForm'
import JoinForm from './pages/user/JoinForm'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'
import { createContext, useEffect, useState } from "react";

/*useContext 를 이용해서 하위 컴포넌트들이 데이터 공유하기*/
export const LoginContext = createContext();

function App() {
  //로그인 여부를 판단하는 상태변수 (true이면 로그인, false 로그아웃)
  const [isLogin, setIsLogin] = useState(false);

  //컴포넌트가 mount or update 될때 로그인 여부에 따른 상태값 변경
  useEffect(() => {
    localStorage.getItem("id") != null ? setIsLogin(true) : setIsLogin(false);

    console.log("App useEffect isLogin = ", isLogin);
  },[isLogin]);

  /*
로그인(LoginForm.jsx) or 로그아웃(Header.jsx) 될 때 로그인여부 상태값을 변경할 이벤트
handleLoginChange 와 isLogin 를 사용해야 하는 컴포넌트들이 여럿이기에createContext 를 이용하여 서로 공유할수 있도록 한다.
*/
  const handleLoginChange = (isLogin) => {
    setIsLogin(isLogin);
  };

  return (
    
    <div className="App">
      <LoginContext.Provider 
    value={ {isLogin:isLogin , handleLoginChange:handleLoginChange } }>
       <Header/>
       <main className="AppManin">
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/saveForm' element={<SaveForm/>} />
            <Route path='/board/:id' element={<Detail/>} />
            <Route path='/updateForm/:id' element={<UpdateForm/>} />
            <Route path='/loginForm' element={<LoginForm/>} />
            <Route path='/joinForm' element={<JoinForm/>} />
            <Route path='/*' element={<NotFound/>} />
        </Routes>
     </main>
        <Footer />
      </LoginContext.Provider>   
    </div>
   
  )
}

export default App
