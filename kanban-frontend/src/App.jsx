import React, { useEffect, useState } from 'react';
import api from './services/api';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const colunas = ["A Fazer", "Fazendo", "Feito"];

  useEffect(() => {
    api.get('/usuarios')
      .then(response => setUsuarios(response.data))
      .catch(error => console.error("Erro:", error));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-10">
      <header className="mb-10 flex justify-between items-center border-b border-slate-700 pb-5">
        <div>
          <h1 className="text-4xl font-black text-blue-500">KANBAN</h1>
          <p className="text-slate-400">Total de usuários: {usuarios.length}</p>
        </div>
      </header>

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {colunas.map((titulo) => (
          <div key={titulo} className="bg-slate-800 p-5 rounded-xl shadow-2xl border-t-4 border-blue-500">
            <h2 className="font-bold text-xl mb-6 flex justify-between items-center">
              {titulo}
              <span className="bg-slate-700 text-xs px-2 py-1 rounded">{usuarios.length}</span>
            </h2>
            
            <div className="space-y-4">
              {usuarios.map(user => (
                <div key={user.id} className="bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-blue-400 transition-all cursor-pointer shadow-md">
                  <p className="font-bold text-blue-300">{user.nome}</p>
                  <p className="text-sm text-slate-400">{user.email}</p>
                  <div className="mt-3 flex gap-2">
                    <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-300 uppercase font-bold tracking-wider">Tarefa</span>
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