import React, { useState } from 'react';
import UserService from '../services/UserService'; 
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterPage() {
  const [user, setUser] = useState({
    Nome: '',
    Senha: '',
    Usuario: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); 
    try {
      const response = await UserService.addUser(user);
      console.log('Usuário registrado com sucesso:', response);
      toast.success('Usuário registrado com sucesso!'); 
      setTimeout(() => {
        navigate('/login'); 
      }, 2000);
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setError('Erro ao registrar usuário: ' + (error.response ? error.response.data : 'Erro desconhecido'));
      toast.error('Erro ao registrar usuário!');
    }
  };

  return (
    <div>
      <h1>Registrar</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Mostrar erro se existir */}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="Nome"
          placeholder="Nome"
          value={user.Nome}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="Usuario"
          placeholder="Usuário"
          value={user.Usuario}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="Senha"
          placeholder="Senha"
          value={user.Senha}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Registrar</button>
      </form>
      <p>
        Já tem uma conta? <a href="/login">Faça login</a>
      </p>
      <ToastContainer /> {/* Componente para exibir as notificações */}
    </div>
  );
}

export default RegisterPage;
