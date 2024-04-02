import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // 👋 add the line below to add jsdom to vite
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js',
    coverage: {
      exclude: [
        '*.config.*',
        '.eslintrc.cjs',
        'src/Services/*',
        'src/Utilitaires/animationLogoEtTitreEtGraphique.js',
        'src/Utilitaires/animationAffichageFleches.js',
      ],
    }
  }
})
