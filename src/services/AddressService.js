import axios from 'axios';

const API_URL = 'https://localhost:7225/api';

const AddressService = {
  getAddressByCEP: async (cep) => {
    try {
      const response = await axios.get(`${API_URL}/addres/${cep}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar endereço por CEP:', error.response ? error.response.data : error.message);
      throw error; 
    }
  },

  getAddressesByUserId: async (userId) => {
    if (!userId) {
      throw new Error('O userId não pode ser nulo ou indefinido');
    }
    try {
      const response = await axios.get(`${API_URL}/addres/usuario/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar endereços pelo ID do usuário:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  addAddress: async (address) => {
 
    const addressData = {
   ...address,
      logradouro: address.rua,
      uf: address.estado 
    };

    try {
      const response = await axios.post(`${API_URL}/addres/adicionar-endereco`, addressData);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  updateAddress: async (id, address) => {
    try {
      const response = await axios.put(`${API_URL}/addres/${id}`, address);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar endereço:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  deleteAddress: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/addres/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar endereço:', error.response ? error.response.data : error.message);
      throw error;
    }
  },
};

export default AddressService;
