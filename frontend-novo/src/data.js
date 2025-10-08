// frontend-novo/src/data.js
export const initialCategories = {
  despesa: [
    { id: 'd1', name: 'Moradia' }, { id: 'd2', name: 'Alimentação' }, { id: 'd3', name: 'Transporte' },
    { id: 'd4', name: 'Lazer' }, { id: 'd5', name: 'Saúde' }, { id: 'd6', name: 'Educação' },
  ],
  receita: [
    { id: 'r1', name: 'Salário' }, { id: 'r2', name: 'Freelance' }, { id: 'r3', name: 'Investimentos' },
  ],
};
export const initialTransactions = [
  { id: 1, date: '2025-07-05', description: 'Salário Mensal', categoryId: 'r1', value: 5000, type: 'receita', status: 'pago' },
  { id: 2, date: '2025-07-05', description: 'Aluguel', categoryId: 'd1', value: 1500, type: 'despesa', status: 'pago' },
  { id: 3, date: '2025-07-10', description: 'Supermercado', categoryId: 'd2', value: 450, type: 'despesa', status: 'pago' },
  { id: 4, date: '2025-07-20', description: 'Projeto Freelance X', categoryId: 'r2', value: 800, type: 'receita', status: 'pago' },
  { id: 5, date: '2025-08-05', description: 'Salário Mensal', categoryId: 'r1', value: 5000, type: 'receita', status: 'pago' },
  { id: 6, date: '2025-08-05', description: 'Aluguel', categoryId: 'd1', value: 1500, type: 'despesa', status: 'pago' },
  { id: 7, date: '2025-08-12', description: 'Supermercado', categoryId: 'd2', value: 520, type: 'despesa', status: 'pago' },
  { id: 8, date: '2025-09-05', description: 'Salário Mensal', categoryId: 'r1', value: 5000, type: 'receita', status: 'pago' },
  { id: 9, date: '2025-09-05', description: 'Aluguel', categoryId: 'd1', value: 1500, type: 'despesa', status: 'pago' },
  { id: 10, date: '2025-09-15', description: 'Viagem', categoryId: 'd4', value: 700, type: 'despesa', status: 'pago' },
];