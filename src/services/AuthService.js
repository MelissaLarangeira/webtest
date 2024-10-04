// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'https://localhost:7225/api/addres/';

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}login`, {
        usuario: email,
        senha: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const { usuarioID } = response.data; 
      localStorage.setItem("usuarioID", usuarioID);
      
      return response.data; 
    } catch (error) {
     
      throw new Error('Erro ao realizar login: ' + (error.response ? error.response.data : error.message));
    }
  },
};

export default AuthService;
