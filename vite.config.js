import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const levaStub = fileURLToPath(new URL('./src/stubs/leva.js', import.meta.url))
const perfStub = fileURLToPath(new URL('./src/stubs/r3f-perf.js', import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProd = mode === 'production'
  const enablePerf = env.VITE_ENABLE_PERF === 'true'
  return {
    plugins: [react()],
    resolve: {
      alias: isProd
        ? {
            leva: levaStub,
            ...(enablePerf ? {} : { 'r3f-perf': perfStub }),
          }
        : {},
    },
  }
})
