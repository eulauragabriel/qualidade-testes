import React, { useState } from 'react';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';
import { IUser } from './services/api';
import './App.css';

function App() {
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleEdit = (user: IUser) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleCreateNew = () => {
    setSelectedUser(undefined);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setSelectedUser(undefined);
    setRefreshTrigger(!refreshTrigger);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedUser(undefined);
  };

  const handleDelete = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>CRUD Application</h1>
          <p>Manage users with MongoDB/Firebase integration</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {showForm ? (
            <UserForm
              user={selectedUser}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          ) : (
            <div className="action-bar">
              <button className="btn btn-primary btn-large" onClick={handleCreateNew}>
                + Create New User
              </button>
            </div>
          )}

          {!showForm && (
            <UserList
              onEdit={handleEdit}
              onDelete={handleDelete}
              refreshTrigger={refreshTrigger}
            />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>CRUD Application v1.0.0 | Powered by React + TypeScript</p>
      </footer>
    </div>
  );
}

export default App;
