import { useContext } from "react";
import { AdminLoginContext } from "../context/AdminLoginContext";

const useIsAdminLoggedIn = ()=>{
     const adminState = useContext(AdminLoginContext);
      return adminState;
}

export default useIsAdminLoggedIn;