// frontend-novo/src/AIInsights.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { BrainCircuit, Loader, AlertTriangle } from 'lucide-react';

const AIInsights = ({ transactions, categories }) => {
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateInsights = async () => {
    setIsLoading(true);
    setError('');
    setInsights(null);

    const prompt = `Analise estes dados financeiros: ${JSON.stringify(transactions)}. As categorias são: ${JSON.stringify(categories)}. Responda em português.`;
    
    try {
      const response = await axios.post(
  `${import.meta.env.VITE_API_BASE_URL}?action=proxy_ai`, 
  {
    prompt: prompt,
    password: 'controle-financeiro-2025-Pcm4481'
  }
);

      console.log("Resposta recebida do backend:", response.data);

// Converte a resposta em objeto, se ela vier como texto
const parsedData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

setInsights(parsedData);
    } catch (err) {
      setError('Falha ao gerar insights. Verifique se o servidor PHP local está rodando na porta 8000.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Análise Financeira com IA</h2>
          <p className="text-gray-500 mt-1">Obtenha insights sobre seus dados financeiros.</p>
        </div>
        <button onClick={handleGenerateInsights} disabled={isLoading} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors">
          {isLoading ? <Loader className="animate-spin" /> : <BrainCircuit />}
          {isLoading ? 'Analisando...' : 'Gerar Análise'}
        </button>
      </div>
      {error && <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2"><AlertTriangle /> {error}</div>}
      {insights && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-bold text-lg mb-2">Análise Geral</h3>
            <p className="text-gray-700">{insights.analiseGeral}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-bold text-lg mb-2 text-green-800">Pontos Positivos</h3>
            <ul className="list-disc list-inside text-green-700 space-y-1">
                {(insights?.pontosPositivos ?? []).map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 col-span-1 md:col-span-2">
            <h3 className="font-bold text-lg mb-2 text-yellow-800">Sugestões de Melhoria</h3>
            <ul className="list-disc list-inside text-yellow-700 space-y-1">
                {(insights?.sugestoesMelhoria ?? []).map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsights;