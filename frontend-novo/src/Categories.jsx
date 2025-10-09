// frontend-novo/src/Categories.jsx

import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

const Categories = ({ categories, onAddCategory, onDeleteCategory }) => {
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('despesa');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim() === '') return;
    onAddCategory({ name: newName, type: newType });
    setNewName('');
  };

  return (
    <div className="space-y-8">
      {/* Formulário para Adicionar Nova Categoria */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Adicionar Nova Categoria</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nome da categoria"
            required
            className="flex-grow p-2 border border-gray-300 rounded-md"
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="despesa">Despesa</option>
            <option value="receita">Receita</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Adicionar
          </button>
        </form>
      </div>

      {/* Listas de Categorias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna de Despesas */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-red-600 mb-4">Categorias de Despesa</h3>
          <ul className="space-y-2">
            {categories.despesa.map(cat => (
              <li key={cat.id} className="flex justify-between items-center p-2 rounded hover:bg-gray-100">
                <span>{cat.name}</span>
                <button 
                  onClick={() => onDeleteCategory(cat.id)}
                  className="text-gray-400 hover:text-red-600"
                  title="Excluir categoria"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Coluna de Receitas */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-green-600 mb-4">Categorias de Receita</h3>
          <ul className="space-y-2">
            {categories.receita.map(cat => (
              <li key={cat.id} className="flex justify-between items-center p-2 rounded hover:bg-gray-100">
                <span>{cat.name}</span>
                <button 
                  onClick={() => onDeleteCategory(cat.id)}
                  className="text-gray-400 hover:text-red-600"
                  title="Excluir categoria"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Categories;