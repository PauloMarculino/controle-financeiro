// frontend-novo/src/App.jsx
import React, { useState } from 'react';
import { initialTransactions, initialCategories } from './data';
import { LayoutDashboard, List, BrainCircuit } from 'lucide-react';
import AIInsights from './AIInsights.jsx'; // Verifique se o nome do arquivo está correto

function App() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [categories] = useState(initialCategories);
  const [activeTab, setActiveTab] = useState('dashboard');

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
        activeTab === id ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">Painel Financeiro IA</h1>
          <nav className="flex items-center gap-2">
            <TabButton id="dashboard" label="Dashboard" icon={LayoutDashboard} />
            <TabButton id="transactions" label="Transações" icon={List} />
            <TabButton id="ai-insights" label="Insights IA" icon={BrainCircuit} />
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        {activeTab === 'dashboard' && <div className="text-xl">Dashboard (Em breve!)</div>}
        {activeTab === 'transactions' && <div className="text-xl">Transações (Em breve!)</div>}
        {activeTab === 'ai-insights' && <AIInsights transactions={transactions} categories={categories} />}
      </main>
    </div>
  );
}

export default App;