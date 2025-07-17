import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useIsAdminLoggedIn from "../../hooks/useIsAdminLoggedIn";
import { Link, useNavigate } from "react-router-dom";


const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const isAdminLoggedIn = useIsAdminLoggedIn();
  const navigate = useNavigate(); 


  async function fetchData() {
    const response = await fetch("http://localhost:3000/admin/users", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("adminToken"),
      },
    });

    const data = await response.json();
    if (data.msg === "users exist") {
      setUsers(data.allUsers);
    }
  }

  async function deleteUser(user_id){
         const response = await fetch(`http://localhost:3000/admin/delete/user/${user_id}`,{
             method : "DELETE",
             headers : {
                 "Content-Type" : "application/json",
                 "token" : localStorage.getItem("adminToken")
             }
         });
         const data = await response.json();

         if(data.msg == "user deleted successfully"){
              toast.success("user deleted successfully");

              // here two thing can happen when it is successful then u can manually update the state variable by filtering the users with this user_id
            //   2)  second refetch the data from the database after the database is updated 

            fetchData();
         }else {
              toast.error(data.msg || data.detailError )
         }
  }

  useEffect(() => {
    if(isAdminLoggedIn.isAdminLoggedIn == false){
          navigate("/error");
    }
    fetchData();
  }, []);

  if(users.length == 0){
      return <div className="text-center text-2xl py-5">You have currently logged in users: {users.length}</div>
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl text-center py-5">
        You have currently logged in users: {users.length}
      </h1>
      <table className="table-auto border-2 border-collapse w-full">
        <thead>
          <tr>
            <th className="border  px-6 text-xl py-4">Users Name</th>
            <th className="border  px-6 text-xl py-4">Users Email</th>
            <th className="border  px-6 text-xl py-4">Users Phone Number</th>
            <th className="border  px-4 text-xl py-4">Delete List</th>
            <th className="border  px-4 text-xl py-4">Update List</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border  text-center text-lg px-6 py-4">{user.name}</td>
              <td className="border  text-center text-lg px-6 py-4">{user.email}</td>
              <td className=" text-center text-lg border px-6 py-4">{user.phoneNumber}</td>
              <td className="text-center text-lg border px-6 py-1"> <button onClick={()=>{ deleteUser(user._id); }} className="bg-indigo-500 text-white rounded-xl px-4 py-1 hover:bg-red-400 border-2 hover:text-black cursor-pointer ">Delete</button>
              </td>
               <td className="text-center border px-6 py-1"> <Link to={"/admin/update/user/"+user._id}>
                <button className="bg-pink-300 text-black rounded-xl px-4 py-1 hover:bg-emerald-400 hover:text-black border-2 cursor-pointer ">Update</button></Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default AdminUsers;
