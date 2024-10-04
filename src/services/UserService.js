import axios from 'axios';

const API_URL = 'https://localhost:7225/api';

const UserService = {
  addUser: async (user) => {
    try {
      const response = await axios.post(`${API_URL}/addres/adicionar-usuario`, user);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error.response ? error.response.data : error.message);
      throw error; 
    }
  },
  

  getUserById: async (id) => {
    const response = await axios.get(`${API_URL}/address/usuario/${id}`);
    return response.data;
  }
};

export default UserService;
