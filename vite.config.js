import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
  base: 'https://glad432.github.io/',
  plugins: [
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
    rollupOptions: {
      plugins: [
        terser({
          compress: {},
          mangle: {},
          format: {
            comments: false,
          }
        })
      ]
    }
  }
});
