import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

import api from './services/api'

import './App.css'

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert("fill in some zip code");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    }
    catch (error) {
      alert("zip code not found ");
      setInput("");
    }
  }

  return (
    <div className='container'>
      <h1 className='title'>Zip Finder</h1>

      <div className='containerInput'>
        <input 
        type="text"
        placeholder='Type your zip code...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button className='btnSearch' onClick={handleSearch}>
          <FiSearch size={25} color='#FFFFFF'/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>ZIP CODE: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
     
    </div>
  )
}

export default App
