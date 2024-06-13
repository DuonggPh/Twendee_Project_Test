import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/App.css"; // Import CSS styles

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

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
      return nameA.localeCompare(nameB);
    });
    setUsers(sortedUsers);
  };

  const nextPage = () => {
    if (currentPage < 10) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleThumbnailClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const startIndex = (currentPage - 1) * 10 + 1;

  return (
    <div className="container">
      {/* <div className="header">
        <h1>Twendee</h1>
      </div> */}
      <div className="userTable">
        <h1>User List</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Username</th>
              <th>Thumbnail</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                // onMouseEnter={() => handleMouseEnter(user)}
                // onMouseLeave={handleMouseLeave}
              >
                <td>{startIndex + index}</td>
                <td>{`${user.name.title} ${user.name.first} ${user.name.last}`}</td>
                <td>{user.login.username}</td>
                <td>
                  <img
                    src={user.picture.thumbnail}
                    alt="thumbnail"
                    className="thumbnail"
                    onClick={() => handleThumbnailClick(user)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            &lt;
          </button>
          {Array.from({ length: 10 }, (_, index) => (
            <span
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </span>
          ))}
          <button onClick={nextPage} disabled={currentPage === 10}>
            &gt;
          </button>
        </div>
        {selectedUser && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
              <h2>{`${selectedUser.name.title} ${selectedUser.name.first} ${selectedUser.name.last}`}</h2>
              <p>Gender: {selectedUser.gender}</p>
              <p>Email: {selectedUser.email}</p>
              <p>
                Location: {selectedUser.location.city},{" "}
                {selectedUser.location.state}, {selectedUser.location.country}
              </p>
              <p>Timezone: {selectedUser.location.timezone.description}</p>
              <p>Username: {selectedUser.login.username}</p>
              <p>Phone: {selectedUser.phone}</p>
              <p>Age: {selectedUser.dob.age}</p>
              <img src={selectedUser.picture.large} alt="User" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserList;
