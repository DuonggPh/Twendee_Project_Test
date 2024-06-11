// src/UserList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    const response = await axios.get(
      `https://randomuser.me/api/?page=${currentPage}&results=10`
    );
    const sortedUsers = response.data.results.sort((a, b) => {
      const nameA = `${a.name.first} ${a.name.last}`.toUpperCase();
      const nameB = `${b.name.first} ${b.name.last}`.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setUsers(sortedUsers);
  };

  const nextPage = () => {
    if (currentPage <= 10) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const startIndex = (currentPage - 1) * 10 + 1;
  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Username</th>
            <th>Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{startIndex + index}</td>
              <td>{`${user.name.title} ${user.name.first} ${user.name.last}`}</td>
              <td>{user.login.username}</td>
              <td>
                <img src={user.picture.thumbnail} alt="thumbnail" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: 10 }, (_, index) => (
          <span key={index} className={currentPage === index + 1 ? "bold" : ""}>
            {index + 1}
          </span>
        ))}
        <button onClick={nextPage} disabled={currentPage === 10}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
