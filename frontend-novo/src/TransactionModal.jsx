// frontend-novo/src/TransactionModal.jsx

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const TransactionModal = ({ isOpen, onClose, onSave, categories, transactionToEdit }) => {
  const [type, setType] = useState('despesa');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    if (transactionToEdit) {
      setType(transactionToEdit.type);
      setDescription(transactionToEdit.description);
      setValue(transactionToEdit.value);
      setDate(transactionToEdit.date);
      setCategoryId(transactionToEdit.categoryId);
    } else {
      setType('despesa');
      setDescription('');
      setValue('');
      setDate(new Date().toISOString().split('T')[0]);
      setCategoryId('');
    }
  }, [transactionToEdit, isOpen]);


  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = {
      id: transactionToEdit ? transactionToEdit.id : Date.now(),
      date,
      description,
      categoryId,
      value: parseFloat(value),
      type,
      status: 'pago',
    };
    onSave(transactionData);
  };
  
  const categoryOptions = type === 'receita' ? categories.receita : categories.despesa;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{transactionToEdit ? 'Editar Transação' : 'Adicionar Transação'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700">Tipo</label><select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md"><option value="despesa">Despesa</option><option value="receita">Receita</option></select></div>
            <div><label className="block text-sm font-medium text-gray-700">Descrição</label><input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" /></div>
            <div><label className="block text-sm font-medium text-gray-700">Valor (R$)</label><input type="number" step="0.01" value={value} onChange={(e) => setValue(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" /></div>
            <div><label className="block text-sm font-medium text-gray-700">Data</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" /></div>
            <div><label className="block text-sm font-medium text-gray-700">Categoria</label><select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md"><option value="" disabled>Selecione...</option>{categoryOptions.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          </div>
          <div className="mt-6 flex justify-end gap-4"><button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300">Cancelar</button><button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">Salvar</button></div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;