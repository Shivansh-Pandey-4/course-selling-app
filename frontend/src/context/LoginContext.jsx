import { createContext, useContext } from "react";
import { useState } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = (props)=>{

     const [isLoggedIn , setIsLoggedIn] = useState(!!localStorage.getItem("token"));

     return <LoginContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
          {props.children}
     </LoginContext.Provider>
}