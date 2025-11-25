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
          <h1>Gerenciamento de Usuário</h1>
          <p>Dedicado para a disciplina de Qualidade e Testes de Software</p>
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
                + Novo Usuário
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
      </footer>
    </div>
  );
}

export default App;
