import React, { useState, useEffect } from 'react';
import { IUser, apiService } from '../services/api';
import './UserForm.css';

interface UserFormProps {
  user?: IUser;
  onSubmit: () => void;
  onCancel: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        age: user.age.toString(),
      });
    }
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Nome deve ter menos de 100 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.age) {
      newErrors.age = 'Idade é obrigatória';
    } else {
      const age = parseInt(formData.age);
      if (isNaN(age) || age < 18 || age > 120) {
        newErrors.age = 'Idade deve estar entre 18 e 120';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        age: parseInt(formData.age),
      };

      if (user?._id) {
        await apiService.updateUser(user._id, userData);
        setMessage({ type: 'success', text: 'Usuário atualizado com sucesso!' });
      } else {
        await apiService.createUser(userData);
        setMessage({ type: 'success', text: 'Usuário criado com sucesso!' });
        setFormData({ name: '', email: '', age: '' });
      }

      setTimeout(() => {
        onSubmit();
      }, 1500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="user-form-container">
      <h2>{user ? 'Editar Usuário' : 'Novo Usuário'}</h2>

      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Nome *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite o nome completo"
            disabled={loading}
            maxLength={100}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite o email"
            disabled={loading}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Idade *</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Digite a idade (18-120)"
            disabled={loading}
            min="18"
            max="120"
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Salvando...' : user ? 'Atualizar' : 'Criar'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
