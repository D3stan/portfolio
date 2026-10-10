import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { createHash } from 'crypto'
import { existsSync, readFileSync } from 'fs'
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

// Short hash of the compiled resume PDF, appended to its URL so browsers and
// the GitHub Pages CDN fetch the new file after every deploy instead of a
// cached copy of the old one. Empty when the PDF has not been built.
function resumeVersion() {
  const pdf = path.resolve(__dirname, 'public/documents/Resume.pdf')
  if (!existsSync(pdf)) return ''
  return createHash('sha256').update(readFileSync(pdf)).digest('hex').slice(0, 10)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [resumeData(), react()],
  base: '/', // Use '/' for custom domains
  define: {
    'import.meta.env.RESUME_VERSION': JSON.stringify(resumeVersion()),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/config': path.resolve(__dirname, './src/config'),
    },
  },
})
