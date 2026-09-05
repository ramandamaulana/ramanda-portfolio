import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { fetchLeaderboardData } from './lib/sociabuzz-leaderboard.mjs'

function sociabuzzLeaderboardApi() {
  return {
    name: 'sociabuzz-leaderboard-api',
    configureServer(server: {
      middlewares: {
        use: (route: string, handler: (request: unknown, response: {
          writeHead: (status: number, headers: Record<string, string>) => void
          end: (body: string) => void
        }) => Promise<void>) => void
      }
    }) {
      server.middlewares.use('/api/leaderboard', async (_request, response) => {
        try {
          const data = await fetchLeaderboardData()

          response.writeHead(200, {
            'content-type': 'application/json; charset=utf-8',
            'cache-control': 'no-store',
          })
          response.end(JSON.stringify({
            ok: true,
            updatedAt: new Date().toISOString(),
            ...data,
          }))
        } catch (error) {
          response.writeHead(502, {
            'content-type': 'application/json; charset=utf-8',
            'cache-control': 'no-store',
          })
          response.end(JSON.stringify({
            ok: false,
            error: error instanceof Error ? error.message : 'Gagal mengambil data SociaBuzz',
          }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), sociabuzzLeaderboardApi()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        donate: resolve(__dirname, 'donate.html'),
      },
    },
  },
})
