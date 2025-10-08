// frontend-novo/src/Transactions.jsx

import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Trash2, Edit } from 'lucide-react';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
};

const Transactions = ({ transactions, categories, onAddTransaction, onDeleteTransaction, onEditTransaction }) => {
  const getCategoryName = (type, id) => {
    const categoryList = categories[type] || [];
    const category = categoryList.find(c => c.id === id);
    return category ? category.name : 'Desconhecida';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">Todas as Transações</h2>
        <button onClick={onAddTransaction} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Adicionar Transação
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Status</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Data</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Descrição</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Categoria</th>
              <th className="text-right py-3 px-4 uppercase font-semibold text-sm text-gray-600">Valor</th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{t.type === 'receita' ? <ArrowUpCircle className="text-green-500" /> : <ArrowDownCircle className="text-red-500" />}</td>
                <td className="py-3 px-4">{formatDate(t.date)}</td>
                <td className="py-3 px-4 font-medium">{t.description}</td>
                <td className="py-3 px-4"><span className="bg-gray-200 text-gray-600 py-1 px-3 rounded-full text-xs">{getCategoryName(t.type, t.categoryId)}</span></td>
                <td className={`py-3 px-4 text-right font-bold ${t.type === 'receita' ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(t.value)}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => onEditTransaction(t)} className="text-gray-400 hover:text-blue-600 transition-colors" title="Editar transação"><Edit size={20} /></button>
                    <button onClick={() => onDeleteTransaction(t.id)} className="text-gray-400 hover:text-red-600 transition-colors" title="Excluir transação"><Trash2 size={20} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;