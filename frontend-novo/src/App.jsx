// frontend-novo/src/App.jsx

import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, List, BrainCircuit, Settings } from 'lucide-react';
import AIInsights from './AIInsights.jsx';
import Dashboard from './Dashboard.jsx';
import Transactions from './Transactions.jsx';
import TransactionModal from './TransactionModal.jsx';
import Categories from './Categories.jsx'; // 1. Importamos a nova tela

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState({ receita: [], despesa: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  // Função para buscar todos os dados foi movida para ser reutilizável
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [transRes, catRes] = await Promise.all([
        axios.get(`${API_BASE_URL}?action=get_transactions`),
        axios.get(`${API_BASE_URL}?action=get_categories`)
      ]);
      let transData = transRes.data;
      if (typeof transData === 'string' && transData.trim().startsWith('[')) { transData = JSON.parse(transData); }
      if (Array.isArray(transData)) { setTransactions(transData); } else { setTransactions([]); }
      let catData = catRes.data;
      if (typeof catData === 'string' && catData.trim().startsWith('[')) { catData = JSON.parse(catData); }
      if (Array.isArray(catData)) {
        const organizedCategories = {
          receita: catData.filter(c => c.type === 'receita'),
          despesa: catData.filter(c => c.type === 'despesa'),
        };
        setCategories(organizedCategories);
      } else {
        setCategories({ receita: [], despesa: [] });
      }
    } catch (error) {
      console.error("Erro ao buscar dados iniciais:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Busca os dados iniciais
  }, []);

  // 2. NOVAS FUNÇÕES para gerenciar categorias
  const handleAddCategory = async (categoryData) => {
    try {
      await axios.post(`${API_BASE_URL}?action=add_category`, categoryData);
      fetchData(); // Busca os dados novamente para atualizar a lista
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
    }
  };

  const handleDeleteCategory = async (idToDelete) => {
    if (window.confirm("Você tem certeza? Excluir uma categoria não afeta transações já existentes.")) {
      try {
        await axios.post(`${API_BASE_URL}?action=delete_category`, { id: idToDelete });
        fetchData(); // Busca os dados novamente para atualizar a lista
      } catch (error) {
        console.error("Erro ao excluir categoria:", error);
      }
    }
  };

  // ... (resto das funções handle... e financialSummary sem alteração)

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen font-bold text-xl">Carregando dados...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">{/* ... (sem alteração) ... */}</header>
      <main className="container mx-auto p-4">
        {activeTab === 'dashboard' && <Dashboard /* ... */ />}
        {activeTab === 'transactions' && <Transactions /* ... */ />}
        {/* 3. SUBSTITUÍMOS o placeholder pela nossa nova tela */}
        {activeTab === 'categories' && <Categories 
          categories={categories} 
          onAddCategory={handleAddCategory} 
          onDeleteCategory={handleDeleteCategory} 
        />}
        {activeTab === 'ai-insights' && <AIInsights /* ... */ />}
      </main>
      <TransactionModal /* ... */ />
    </div>
  );
}

export default App;