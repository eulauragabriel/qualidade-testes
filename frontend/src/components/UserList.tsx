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
      setError(err instanceof Error ? err.message : 'Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, limit, status, refreshTrigger]);

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
      try {
        await apiService.deleteUser(id);
        onDelete(id);
        loadUsers();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao deletar usuário');
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
      setError(err instanceof Error ? err.message : 'Erro ao atualizar status');
    }
  };

  return (
    <div className="user-list-container">
      <div className="list-header">
        <h2>Lista de Usuários</h2>
        <div className="filters">
          <select value={status || ''} onChange={(e) => { setStatus(e.target.value as any); setPage(1); }}>
            <option value="">Todos</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>
          <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}>
            <option value="5">5 por página</option>
            <option value="10">10 por página</option>
            <option value="25">25 por página</option>
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <p className="loading">Carregando...</p>
      ) : users.length === 0 ? (
        <p className="empty-state">Nenhum usuário encontrado</p>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Idade</th>
                  <th>Status</th>
                  <th>Criado</th>
                  <th>Ações</th>
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
                        title="Editar"
                      >
                        ✎
                      </button>
                      <button
                        className={`btn btn-toggle ${user.status}`}
                        onClick={() => handleToggleStatus(user)}
                        title={user.status === 'active' ? 'Desativar' : 'Ativar'}
                      >
                        {user.status === 'active' ? '○' : '●'}
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(user._id!)}
                        title="Deletar"
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
              ← Anterior
            </button>
            <span className="page-info">
              Página {page} de {Math.ceil(total / limit)} ({total} total)
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(total / limit)}
              className="btn"
            >
              Próxima →
            </button>
          </div>
        </>
      )}
    </div>
  );
};
