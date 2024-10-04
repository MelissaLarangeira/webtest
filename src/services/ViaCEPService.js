import axios from 'axios';

const ViaCEPService = {
  getAddressByCEP: async (cep) => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  },
};

export default ViaCEPService;
