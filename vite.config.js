import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: 'https://glad432.github.io/',
  plugins: [
    tailwindcss(),
    createHtmlPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_debugger: true
      },
      format: {
        comments: false
      },
      mangle: {
        toplevel: true
      }
    }
  }
});
