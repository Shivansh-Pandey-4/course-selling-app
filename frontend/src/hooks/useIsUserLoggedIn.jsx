import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

 const useUserIsLoggedIn = ()=>{
      const loginState = useContext(LoginContext);
      return loginState;
}

export default useUserIsLoggedIn;