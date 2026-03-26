import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'

const alias = {
  '@main': resolve(__dirname, 'src/main'),
  '@preload': resolve(__dirname, 'src/preload'),
  '@renderer': resolve(__dirname, 'src/renderer'),
  '@resources': resolve(__dirname, 'resources')
}

export default defineConfig({
  main: {
    resolve: { alias }
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          'index-ui': resolve('src/preload/index-ui.ts'),
          'index-web': resolve('src/preload/index-web.ts')
        }
      }
    },
    resolve: { alias }
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          'index-ui': resolve('src/renderer/index-ui.html'),
          'index-web': resolve('src/renderer/index-web.html')
        }
      }
    },
    resolve: { alias },
    plugins: [react()]
  }
})
