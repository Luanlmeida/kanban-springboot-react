import React from 'react';

function App() {
  const colunas = ["A Fazer", "Fazendo", "Feito"];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">Kanban Board</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {colunas.map((titulo) => (
          <div key={titulo} className="bg-slate-800 p-4 rounded-lg shadow-xl border-t-4 border-blue-500">
            <h2 className="font-bold text-lg mb-4">{titulo}</h2>
            
            <div className="space-y-3">
              {/* Aqui entrarão as tarefas futuramente */}
              <div className="bg-slate-700 p-3 rounded shadow-sm border border-slate-600">
                Exemplo de Tarefa
              </div>
            </div>

            <button className="mt-4 w-full py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm transition-colors">
              + Adicionar Tarefa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;