// frontend-novo/src/Dashboard.jsx

import React, { useMemo } from 'react'; // Adicionamos o useMemo aqui também
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
// Importamos os componentes necessários para o gráfico
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// A função auxiliar para formatar moeda continua a mesma
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// O componente de card continua o mesmo
const MetricCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 transition-transform hover:scale-105">
    <div className={`rounded-full p-3 ${colorClass}`}>
      <Icon size={28} className="text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

// Adicionamos 'transactions' e 'categories' como props
const Dashboard = ({ summary, transactions, categories }) => {
  if (!summary) {
    return <div>Calculando...</div>;
  }

  // NOVA LÓGICA: Processar os dados para o gráfico de pizza
  const expenseDataForChart = useMemo(() => {
    // 1. Agrupar despesas por categoria e somar os valores
    const expensesByCategory = transactions
      .filter(t => t.type === 'despesa')
      .reduce((acc, transaction) => {
        // Encontrar o nome da categoria a partir do seu ID
        const category = categories.despesa.find(c => c.id === transaction.categoryId);
        const categoryName = category ? category.name : 'Outros';
        
        if (!acc[categoryName]) {
          acc[categoryName] = 0;
        }
        acc[categoryName] += transaction.value;
        return acc;
      }, {});

    // 2. Formatar os dados para o formato que o gráfico espera: { name: 'Nome', value: 123 }
    return Object.entries(expensesByCategory).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions, categories]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943'];

  return (
    <div className="space-y-8">
      {/* Seção dos Cards de Métricas (sem alteração) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Saldo Atual" value={formatCurrency(summary.saldo)} icon={Wallet} colorClass="bg-blue-500" />
        <MetricCard title="Total de Receitas" value={formatCurrency(summary.totalReceitas)} icon={TrendingUp} colorClass="bg-green-500" />
        <MetricCard title="Total de Despesas" value={formatCurrency(summary.totalDespesas)} icon={TrendingDown} colorClass="bg-red-500" />
        <MetricCard title="Economia do Período" value={formatCurrency(summary.saldo)} icon={PiggyBank} colorClass="bg-indigo-500" />
      </div>

      {/* NOVO: Seção do Gráfico */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Despesas por Categoria</h3>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={expenseDataForChart}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {expenseDataForChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;