import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useIsAdminLoggedIn from "../../hooks/useIsAdminLoggedIn";
import { Link, useNavigate } from "react-router-dom";
import decodeAdminToken from "../../utils/decodeAdminToken";


const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const isAdminLoggedIn = useIsAdminLoggedIn();
  const adminToken = decodeAdminToken();
  const navigate = useNavigate(); 


  async function fetchData() {
    const response = await fetch("http://localhost:3000/admin/contacts", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("adminToken"),
      },
    });

    const data = await response.json();
    if (data.msg === "contacts exists") {
      setContacts(data.allContacts);
    }else{
        toast.error(data.detailError || data.msg);
        return ;
    }
  }

  async function deleteUser(contact_id){
         const response = await fetch(`http://localhost:3000/admin/delete/contact/${contact_id}`,{
             method : "DELETE",
             headers : {
                 "Content-Type" : "application/json",
                 "token" : localStorage.getItem("adminToken")
             }
         });
         const data = await response.json();

         if(data.msg == "contact deleted successfully"){
              toast.success("contact deleted successfully");

              // here two thing can happen when it is successful then u can manually update the state variable by filtering the contacts with this user_id
            //   2)  second refetch the data from the database after the database is updated 

            fetchData();
         }else {
              toast.error(data.msg || data.detailError )
         }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if(contacts.length == 0){
      return <div className="text-center text-2xl py-5">You have currently: {contacts.length} contacts </div>
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl text-center py-5">
        You have currently {contacts.length} contacts
      </h1>
      <table className="table-auto border-2 border-collapse w-full">
        <thead>
          <tr>
            <th className="border  px-6 text-xl py-4">Users Name</th>
            <th className="border  px-6 text-xl py-4">Users Email</th>
            <th className="border  px-6 text-xl py-4">Users Message</th>
            <th className="border  px-4 text-xl py-4">Delete List</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id} >
              <td className="border  text-center text-lg px-6 py-4">{contact.username}</td>
              <td className="border  text-center text-lg px-6 py-4">{contact.email}</td>
              <td className=" text-center text-lg border px-6 py-4">{contact.message}</td>
              <td className="text-center text-lg border px-6 py-1"> <button onClick={()=>{ deleteUser(contact._id); }} className="bg-indigo-500 text-white rounded-xl px-4 py-1 hover:bg-red-400 border-2 hover:text-black cursor-pointer ">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default AdminContacts;
