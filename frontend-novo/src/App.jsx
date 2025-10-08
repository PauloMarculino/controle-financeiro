// frontend-novo/src/App.jsx

import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { initialCategories } from './data.js';
import { LayoutDashboard, List, BrainCircuit } from 'lucide-react';
import AIInsights from './AIInsights.jsx';
import Dashboard from './Dashboard.jsx';
import Transactions from './Transactions.jsx';
import TransactionModal from './TransactionModal.jsx';

// Para o deploy, esta URL será a do seu site. Para desenvolvimento local, usamos localhost.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [transactions, setTransactions] = useState([]);
  const [categories] = useState(initialCategories);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}?action=get_transactions`);
        let data = response.data;
        if (typeof data === 'string' && data.trim().startsWith('[')) { data = JSON.parse(data); }
        if (Array.isArray(data)) { setTransactions(data); } 
        else { setTransactions([]); }
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // ▼▼▼ BLOCO CORRIGIDO ▼▼▼
  const financialSummary = useMemo(() => {
    const totalReceitas = transactions
      .filter(t => t.type === 'receita')
      .reduce((acc, t) => acc + parseFloat(t.value || 0), 0); // Correção com parseFloat

    const totalDespesas = transactions
      .filter(t => t.type === 'despesa')
      .reduce((acc, t) => acc + parseFloat(t.value || 0), 0); // Correção com parseFloat

    const saldo = totalReceitas - totalDespesas;
    return { totalReceitas, totalDespesas, saldo };
  }, [transactions]);

  const handleSaveTransaction = async (transactionData) => {
    const isEditing = transactions.some(t => t.id === transactionData.id);
    if (isEditing) {
      try {
        await axios.post(`${API_BASE_URL}?action=update_transaction`, transactionData);
        const updatedTransactions = transactions.map(t => t.id === transactionData.id ? transactionData : t);
        setTransactions(updatedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date)));
        handleCloseModal();
      } catch (error) {
        console.error("Erro ao atualizar transação:", error);
      }
    } else {
      try {
        const response = await axios.post(`${API_BASE_URL}?action=add_transaction`, transactionData);
        if (response.data.success) {
          const newTransactionWithRealId = { ...transactionData, id: response.data.id };
          setTransactions(prev => [...prev, newTransactionWithRealId].sort((a, b) => new Date(b.date) - new Date(a.date)));
        }
        handleCloseModal();
      } catch (error) {
        console.error("Erro ao salvar a transação:", error);
      }
    }
  };
  
  const handleDeleteTransaction = async (idToDelete) => {
    if (window.confirm("Você tem certeza que deseja excluir esta transação?")) {
      try {
        await axios.post(`${API_BASE_URL}?action=delete_transaction`, { id: idToDelete });
        setTransactions(prev => prev.filter(transaction => transaction.id !== idToDelete));
      } catch (error) {
        console.error("Erro ao excluir transação:", error);
      }
    }
  };
  
  const handleOpenAddModal = () => { setTransactionToEdit(null); setIsModalOpen(true); };
  const handleOpenEditModal = (transaction) => { setTransactionToEdit(transaction); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setTransactionToEdit(null); };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button onClick={() => setActiveTab(id)} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === id ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}><Icon size={18} />{label}</button>
  );

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen font-bold text-xl">Carregando dados do banco...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">Meu Painel Financeiro Automatizado</h1>
          <nav className="flex items-center gap-2">
            <TabButton id="dashboard" label="Dashboard" icon={LayoutDashboard} />
            <TabButton id="transactions" label="Transações" icon={List} />
            <TabButton id="ai-insights" label="Insights IA" icon={BrainCircuit} />
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        {activeTab === 'dashboard' && <Dashboard 
          summary={financialSummary} 
          transactions={transactions} 
          categories={categories} 
        />}
        {activeTab === 'transactions' && <Transactions 
          transactions={transactions} 
          categories={categories} 
          onAddTransaction={handleOpenAddModal} 
          onDeleteTransaction={handleDeleteTransaction}
          onEditTransaction={handleOpenEditModal}
        />}
        {activeTab === 'ai-insights' && <AIInsights 
          transactions={transactions} 
          categories={categories} 
        />}
      </main>
      
      <TransactionModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTransaction}
        categories={categories}
        transactionToEdit={transactionToEdit}
      />
    </div>
  );
}

export default App;