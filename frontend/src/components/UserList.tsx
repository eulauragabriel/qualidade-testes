import React, { useState, useEffect } from 'react';
import { IUser, apiService } from '../services/api';
import './UserList.css';

interface UserListProps {
  onEdit: (user: IUser) => void;
  onDelete: (id: string) => void;
  refreshTrigger?: boolean;
}

export const UserList: React.FC<UserListProps> = ({ onEdit, onDelete, refreshTrigger }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<'active' | 'inactive' | undefined>();

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getAllUsers(page, limit, status);
      setUsers(response.data);
      setTotal(response.pagination?.total || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, limit, status, refreshTrigger]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await apiService.deleteUser(id);
        onDelete(id);
        loadUsers();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete user');
      }
    }
  };

  const handleToggleStatus = async (user: IUser) => {
    try {
      if (user.status === 'active') {
        await apiService.deactivateUser(user._id!);
      } else {
        await apiService.reactivateUser(user._id!);
      }
      loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  return (
    <div className="user-list-container">
      <div className="list-header">
        <h2>Users List</h2>
        <div className="filters">
          <select value={status || ''} onChange={(e) => { setStatus(e.target.value as any); setPage(1); }}>
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}>
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <p className="loading">Loading...</p>
      ) : users.length === 0 ? (
        <p className="empty-state">No users found</p>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className={`user-row ${user.status}`}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                      <span className={`status-badge ${user.status}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt || '').toLocaleDateString()}</td>
                    <td className="actions">
                      <button
                        className="btn btn-edit"
                        onClick={() => onEdit(user)}
                        title="Edit"
                      >
                        ✎
                      </button>
                      <button
                        className={`btn btn-toggle ${user.status}`}
                        onClick={() => handleToggleStatus(user)}
                        title={user.status === 'active' ? 'Deactivate' : 'Reactivate'}
                      >
                        {user.status === 'active' ? '○' : '●'}
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(user._id!)}
                        title="Delete"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="btn"
            >
              ← Previous
            </button>
            <span className="page-info">
              Page {page} of {Math.ceil(total / limit)} ({total} total)
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(total / limit)}
              className="btn"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
};
