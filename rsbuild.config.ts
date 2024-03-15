import { defineConfig } from '@rsbuild/core';
import { pluginCssMinimizer } from '@rsbuild/plugin-css-minimizer';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSvgr({
      svgrOptions: {
        exportType: 'default',
      },
    }),
    pluginTypeCheck(),
    pluginCssMinimizer(),
  ],
  html: {
    title: 'React To-Do List',
    template: './src/index.html',
    favicon: './src/assets/icons/favicon.ico',
    appIcon: './src/assets/icons/favicon-192x192.png',
    meta: {
      description: 'To-Do list on React',
    },
  },
  source: {
    define: {
      'process.env': JSON.stringify(process.env),
      'process.env.LOCAL_DEV': JSON.stringify(process.env.LOCAL_DEV),
    },
    alias: {
      assets: './src/assets',
      components: './src/components',
      constants: './src/constants',
      containers: './src/containers',
      hooks: './src/hooks',
      pages: './src/pages',
      store: './src/store',
      styles: './src/styles',
      types: './src/types',
      utils: './src/utils',
    },
  },
});
