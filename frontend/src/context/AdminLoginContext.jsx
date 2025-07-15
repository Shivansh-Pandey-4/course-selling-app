import { createContext, useState } from "react";


export const AdminLoginContext = createContext(null);

export const AdminProvider = (props)=>{

    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!localStorage.getItem("adminToken"));

     return <AdminLoginContext.Provider value={{isAdminLoggedIn, setIsAdminLoggedIn}} >
           {props.children}
     </AdminLoginContext.Provider>
}