import { useState, useEffect } from "react";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editingUser, setEditingUser] = useState(null);
    const [message, setMessage] = useState("");
  
    useEffect(() => {
      fetch(`https://reqres.in/api/users?page=${page}`)
        .then((response) => response.json())
        .then((data) => {
          setUsers(data.data);
          setTotalPages(data.total_pages);
        });
    }, [page]);
  
    const handleEdit = (user) => {
      setEditingUser(user);
    };
  
    const handleUpdate = async (e) => {
      e.preventDefault();
      if (!editingUser) return;
  
      const response = await fetch(`https://reqres.in/api/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingUser),
      });
      
      if (response.ok) {
        setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
        setMessage("Updated successfully!");
        setEditingUser(null);
      } else {
        setMessage("Failed to update.");
      }
    };
  
    const handleDelete = async (id) => {
      const response = await fetch(`https://reqres.in/api/users/${id}`, { method: "DELETE" });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
        setMessage("Deleted successfully!");
      } else {
        setMessage("Failed to delete.");
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffe5ec] p-4">
        <h2 className="text-5xl text-[#ff8fab] font-bold mb-30 text-center">Users List</h2>
        {message && <p className="text-[#ff99c8] mb-2">{message}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-[#ffc2d1] p-7 shadow-md flex items-center space-x-4">
              <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full" />
              <div>
                <p className="text-lg font-bold">{user.first_name} {user.last_name}</p>
                <p className="text-gray-500">{user.email}</p>
                <button className="text-[#03045e]" onClick={() => handleEdit(user)}>Edit</button>
                <button className="text-red-500 ml-2" onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-30 space-x-2">
          <button className="px-5 py-2 bg-[#ff8fab] text-white rounded-4xl disabled:bg-gray-400" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>Prev</button>
          <span className="px-4 py-2">{page} of {totalPages}</span>
          <button className="px-5 py-2 bg-[#ff8fab] text-white rounded-4xl disabled:bg-gray-400" onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>Next</button>
        </div>
        {editingUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#ffe5ec] bg-opacity-50">
            <div className="bg-white p-10 shadow-lg">
              <h3 className="text-lg font-bold mb-5">Edit User</h3>
              <form onSubmit={handleUpdate}>
                <input type="text" className="w-full p-2 border rounded mb-2" value={editingUser.first_name} onChange={(e) => setEditingUser({ ...editingUser, first_name: e.target.value })} required />
                <input type="text" className="w-full p-2 border rounded mb-2" value={editingUser.last_name} onChange={(e) => setEditingUser({ ...editingUser, last_name: e.target.value })} required />
                <input type="email" className="w-full p-2 border rounded mb-2" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} required />
                <div className="flex justify-between mt-5">
                  <button type="submit" className="bg-[#ff8fab] text-white px-4 py-2 rounded">Update</button>
                  <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditingUser(null)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

export default UsersList;