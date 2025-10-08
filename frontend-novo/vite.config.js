import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/controle-financeiro/', // <--- ADICIONE ESTA LINHA
  plugins: [react()],
})