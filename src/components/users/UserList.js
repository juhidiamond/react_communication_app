import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUserId, setcurrentUserId] = useState(null);

  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(usersData);
  }, []);

  const handleEdit = (index) => {
    navigate(`/users/edit-user/${users[index].id}`);
  };

  const handleUserDeleteModal = (id) => {
    setShowDeleteModal(true);
    setcurrentUserId(id);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setcurrentUserId(null);
  };

  const handleDelete = () => {
    const updatedUsers = [...users];
    let restUsers = updatedUsers.filter((result) => result.id !== parseInt(currentUserId));
    localStorage.setItem("users", JSON.stringify(restUsers));
    setUsers(restUsers);
    handleCloseDeleteModal();
  };

  return (
    <>
      <div className="container">
        <h2 className="mt-4">User List</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  {user?.id !== loggedUser?.id && (
                    <button
                      className="btn"
                      onClick={() => handleUserDeleteModal(user.id)}
                    >
                      | Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default UsersList;
