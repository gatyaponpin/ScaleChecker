import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { viteSingleFile } from 'vite-plugin-singlefile'
import path from 'node:path'

export default defineConfig({
  base: './',  
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    viteSingleFile(),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  build: {
    cssCodeSplit: false, // CSSを分割しない
    assetsInlineLimit: 100000000, // アセットも極力インライン化（大きめに）
    modulePreload: false,
  },
})