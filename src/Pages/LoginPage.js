import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import './styles.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const user = await AuthService.login(email, password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/enderecos'); 
        
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid credentials or server error');
      console.error(err); 
    }
  };


  const handleRegisterRedirect = () => {
    navigate('/register'); 
  };

  

  return (
    <div className="container">
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button onClick={handleRegisterRedirect}>Registrar</button>
      </form>
    </div>
  );
}
export default LoginPage;