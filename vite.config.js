import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
// import { sveltePreprocess } from 'svelte-preprocess/dist/autoProcess';

export default defineConfig({
	plugins: [sveltekit()],
  server: { fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
        // your custom rules
        'src/*.{js,jsx,svelte,json,css,html}',
        'src/**/*.{js,jsx,ts,tsx,svelte}',
        'static/**/*.{txt}',
        'src/**/**/*.{js,jsx,ts,tsx,svelte,svg,png,txt}',
        'src/**/**/**/*.{js,jsx,ts,tsx,svelte,svg,png,txt}',
      ]
    }
  }
});
