import React, { useEffect, useState } from 'react';
import api from './services/api';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [novoNome, setNovoNome] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const colunas = ["A Fazer", "Fazendo", "Feito"];

  const buscarUsuarios = () => {
    api.get('/usuarios')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error("Erro ao buscar:", err));
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const cadastrarUsuario = (e) => {
    e.preventDefault();
    api.post('/usuarios', { nome: novoNome, email: novoEmail })
      .then(() => {
        setNovoNome('');
        setNovoEmail('');
        buscarUsuarios();
      })
      .catch(err => alert("Erro ao cadastrar! O Java está rodando?"));
  };

  const excluirUsuario = (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      api.delete(`/usuarios/${id}`)
        .then(() => buscarUsuarios())
        .catch(err => console.error("Erro ao deletar:", err));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 md:p-10 font-sans">
      <header className="mb-10 flex flex-col lg:flex-row justify-between items-center gap-6 border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-4xl font-black text-blue-500 tracking-tighter">KANBAN SYSTEM</h1>
          <p className="text-slate-500 font-medium">Controle de Fluxo | {usuarios.length} usuários</p>
        </div>

        <form onSubmit={cadastrarUsuario} className="flex flex-wrap gap-3 bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-xl">
          <input
            className="bg-slate-700 p-3 rounded-xl text-sm outline-none focus:ring-2 ring-blue-500 w-full md:w-auto"
            placeholder="Nome Completo"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            required
          />
          <input
            className="bg-slate-700 p-3 rounded-xl text-sm outline-none focus:ring-2 ring-blue-500 w-full md:w-auto"
            placeholder="E-mail"
            value={novoEmail}
            onChange={(e) => setNovoEmail(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/20">
            ADICIONAR
          </button>
        </form>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {colunas.map((titulo) => (
          <div key={titulo} className="bg-slate-800/50 p-6 rounded-3xl border border-slate-800 backdrop-blur-sm min-h-[500px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">{titulo}</h2>
              <span className="bg-slate-700 text-[10px] px-2 py-1 rounded-full text-slate-300 font-bold">{usuarios.length}</span>
            </div>

            <div className="flex flex-col gap-4">
              {usuarios.map(user => (
                <div key={user.id} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 hover:border-red-500/30 transition-all shadow-sm group">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-100 text-lg leading-tight group-hover:text-blue-400 transition-colors">{user.nome}</p>
                      <p className="text-sm text-slate-500 mt-1">{user.email}</p>
                    </div>
                    { }
                    <button
                      onClick={() => excluirUsuario(user.id)}
                      className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-500 transition-all p-1"
                    >
                      🗑️
                    </button>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Usuário Ativo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;