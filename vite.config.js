import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { writeSiteData } from './scripts/resume-to-site.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Builds src/config/resume.generated.json from the LaTeX resume in /resume,
// and rebuilds it whenever a .tex file changes while `npm run dev` runs.
function resumeData() {
  return {
    name: 'resume-data',
    buildStart() {
      writeSiteData()
    },
    configureServer(server) {
      server.watcher.add(path.resolve(__dirname, 'resume'))
      server.watcher.on('all', (_event, file) => {
        if (!file.endsWith('.tex')) return
        try {
          writeSiteData({ log: server.config.logger })
        } catch (error) {
          server.config.logger.error(`Resume: ${error.message}`)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [resumeData(), react()],
  base: '/', // Use '/' for custom domains
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/config': path.resolve(__dirname, './src/config'),
    },
  },
})
