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
    api.post('/usuarios', {
      nome: novoNome,
      email: novoEmail,
      senha: "123456"
    })
      .then(() => {
        setNovoNome('');
        setNovoEmail('');
        buscarUsuarios();
      })
      .catch(err => console.error("Erro no cadastro:", err));
  };

  const mudarStatus = (id, novoStatus) => {
    api.patch(`/usuarios/${id}/status`, novoStatus, {
      headers: { 'Content-Type': 'text/plain' }
    })
      .then(() => buscarUsuarios())
      .catch(err => console.error("Erro ao mover:", err));
  };

  const excluirUsuario = (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      api.delete(`/usuarios/${id}`)
        .then(() => buscarUsuarios())
        .catch(err => console.error("Erro ao deletar:", err));
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* CABEÇALHO */}
      <header className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-normal text-gray-800 mb-4">Quadro Kanban da Equipe</h1>
        
        <div className="flex items-center gap-4 text-sm mb-6">
          <span className="font-semibold text-gray-500">FILTROS RÁPIDOS:</span>
          <button className="text-blue-600 hover:underline">Tarefas Críticas</button>
          <button className="text-blue-600 hover:underline">Minhas Tarefas</button>
          <button className="text-blue-600 hover:underline">Atualizadas Recentemente</button>
        </div>

        {/* FORMULÁRIO DE CADASTRO */}
        <form onSubmit={cadastrarUsuario} className="flex gap-2">
          <input
            className="border border-gray-300 p-2 rounded-sm text-sm outline-none focus:border-blue-500 w-64"
            placeholder="O que precisa ser feito?"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            required
          />
          <input
            className="border border-gray-300 p-2 rounded-sm text-sm outline-none focus:border-blue-500 w-48"
            placeholder="Responsável (E-mail)"
            value={novoEmail}
            onChange={(e) => setNovoEmail(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors">
            Criar Tarefa
          </button>
        </form>
      </header>

      {/* ÁREA DO BOARD */}
      <div className="p-6 bg-gray-50 min-h-[calc(100vh-180px)]">
        <div className="flex flex-col md:flex-row gap-4 h-full items-start">
          {colunas.map((titulo) => {
            const statusDaColuna = titulo.toUpperCase().replace(" ", "_");
            const usuariosFiltrados = usuarios.filter(u => u.status === statusDaColuna);

            // Cores da borda lateral 
            let corBordaLateral = "border-l-orange-500";
            if (statusDaColuna === "FEITO") corBordaLateral = "border-l-green-500";
            if (statusDaColuna === "FAZENDO") corBordaLateral = "border-l-blue-500";

            return (
              <div key={titulo} className="bg-gray-100 flex-1 min-w-[300px] border border-gray-200 min-h-[500px]">
                {/* TÍTULO DA COLUNA */}
                <div className="p-3 border-b border-gray-200">
                  <h2 className="text-sm text-gray-600 font-semibold">
                    <span className="text-gray-400 mr-2">{usuariosFiltrados.length}</span>
                    {titulo}
                  </h2>
                </div>

                {/* LISTA DE CARDS */}
                <div className="p-2 flex flex-col gap-2">
                  {usuariosFiltrados.map(user => (
                    <div key={user.id} className={`bg-white p-3 border border-gray-200 border-l-4 ${corBordaLateral} shadow-sm hover:bg-gray-50 transition-colors group relative`}>
                      
                      {/* TOPO DO CARD */}
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                          <span className="text-green-600">☑</span>
                          <span className="hover:underline cursor-pointer">KAN-{user.id}</span>
                        </div>
                        <img 
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.nome)}&background=random&color=fff&size=24`} 
                          alt="Avatar do responsável" 
                          className="w-6 h-6 rounded-full"
                        />
                      </div>

                      {/* MEIO DO CARD */}
                      <p className="text-gray-800 text-sm mb-4 leading-snug">
                        {user.nome}
                      </p>

                      {/* RODAPÉ DO CARD */}
                      <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => excluirUsuario(user.id)}
                          className="text-gray-400 hover:text-red-600 text-xs font-medium"
                          title="Excluir Tarefa"
                        >
                          Deletar
                        </button>

                        <div className="flex gap-2">
                          {statusDaColuna !== "A_FAZER" && (
                            <button 
                              onClick={() => mudarStatus(user.id, statusDaColuna === "FEITO" ? "FAZENDO" : "A_FAZER")}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs transition-colors font-medium"
                            >
                              Anterior
                            </button>
                          )}
                          {statusDaColuna !== "FEITO" && (
                            <button 
                              onClick={() => mudarStatus(user.id, statusDaColuna === "A_FAZER" ? "FAZENDO" : "FEITO")}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs transition-colors font-medium"
                            >
                              Próximo
                            </button>
                          )}
                        </div>
                      </div>
                      
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;