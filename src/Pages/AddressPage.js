import { useState, useEffect } from 'react';
import AddressService from '../services/AddressService';
import ViaCEPService from '../services/ViaCEPService';
import './styles.css';


function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    cep: '',
    rua: '',
    cidade: '',
    complemento: '',
    numero: '',
    estado: '',
    bairro: '',
    usuarioID: '' 
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('User retrieved from localStorage:', user); 
    if (user) {
        setUserId(user.id);
        fetchAddresses(user.id);
    }
}, []);

  const fetchAddresses = async (userId) => {
    try {
      const data = await AddressService.getAddressesByUserId(userId);
      setAddresses(data);
    } catch (error) {
      console.error('Erro ao buscar endereços:', error);
    }
  };

  const handleAddAddress = async () => {
    try {
      console.log('Adicionando endereço:', { ...newAddress }); 
      await AddressService.addAddress( newAddress);
      setNewAddress({
        cep: '',
        rua: '',
        cidade: '',
        complemento: '',
        numero: '',
        estado: '',
        bairro: '',
        usuarioID: ''
      });
  
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await AddressService.deleteAddress(id);
      fetchAddresses(userId);
    } catch (error) {
      console.error('Erro ao deletar endereço:', error);
    }
  };

  const handleCEPChange = (cep) => {
    setNewAddress({ ...newAddress, cep });
    if (cep.length === 8) { 
      fetchAddressByCEP(cep);
    }
  };

  const fetchAddressByCEP = async (cep) => {
    try {
      const data = await ViaCEPService.getAddressByCEP(cep);
      if (data) {
        setNewAddress((prev) => ({
          ...prev,
          rua: data.logradouro,
          cidade: data.localidade,
          estado: data.uf,
          bairro: data.bairro 
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar endereço pelo CEP:', error);
    }
  };

  return (
    <div className="container">
      <h1>Endereços</h1>
      <div>
        <input
          type="text"
          placeholder="CEP"
          value={newAddress.cep}
          onChange={(e) => handleCEPChange(e.target.value)} 
        />
        <input
          type="text"
          placeholder="Rua"
          value={newAddress.rua}
          onChange={(e) => setNewAddress({ ...newAddress, rua: e.target.value })}
        />
        <input
          type="text"
          placeholder="Número"
          value={newAddress.numero}
          onChange={(e) => setNewAddress({ ...newAddress, numero: e.target.value })}
        />
        <input
          type="text"
          placeholder="Complemento"
          value={newAddress.complemento}
          onChange={(e) => setNewAddress({ ...newAddress, complemento: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cidade"
          value={newAddress.cidade}
          onChange={(e) => setNewAddress({ ...newAddress, cidade: e.target.value })}
        />
        <input
          type="text"
          placeholder="Bairro"
          value={newAddress.bairro}
          onChange={(e) => setNewAddress({ ...newAddress, bairro: e.target.value })}
        />
        <input
          type="text"
          placeholder="UF"
          value={newAddress.estado}
          onChange={(e) => setNewAddress({ ...newAddress, estado: e.target.value })}
        />
        <input
          type="text"
          placeholder="Usuario ID"
          value={newAddress.usuarioID} // Mantendo o usuarioID no campo
          onChange={(e) => {
            setNewAddress({ ...newAddress, usuarioID: e.target.value })
            console.log(`chegou aqui userId: ${newAddress.usuarioID}`)
        }}
        />

        <button onClick={handleAddAddress}>Adicionar Endereço</button>
      </div>
      <ul>
        {addresses.map((address) => (
          <li key={address.id}>
            {address.cep}, {address.rua}, {address.cidade}
            <button onClick={() => handleDeleteAddress(address.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddressPage;
