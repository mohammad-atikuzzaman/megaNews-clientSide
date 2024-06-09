import { useEffect, useState } from "react";
import useAxiosPrivet from "../Hooks/useAxiosPrivet";

const Users = () => {
  const isAdmin = false;
  const [users, setUsers]= useState([])
  const axiosPriver = useAxiosPrivet();

  useEffect(() => {
    axiosPriver.get("/users").then((res) => {
      // console.log(res.data);
      setUsers(res.data)
    });
  }, []);

  const handleMakeAdmin =(email)=>{
    console.log(email)
    axiosPriver.patch(`/users/${email}`, {isAdmin: true})
    .then(res => console.log(res.data))
    .catch(err => console.error(err))
  }
  console.log(users)
  return (
    <div>
      <h2 className="font-bold text-3xl ">All users</h2>
      <div className="bg-gray-200 p-6 mt-10">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Profile</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody className="border border-t-gray-800">
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.userEmail}</td>
                <td>
                  <img
                    src={user.image}
                    alt=""
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td>
                  {user?.isAdmin ? (
                    "admin"
                  ) : (
                    <button onClick={() =>handleMakeAdmin(user.userEmail)} className="bg-violet-500 px-3 py-2 rounded-md text-gray-900 font-semibold">
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
