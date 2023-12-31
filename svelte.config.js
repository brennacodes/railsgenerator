import adapter from '@sveltejs/adapter-vercel';
import path from 'node:path';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [
        preprocess()
    ],
    kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
      adapter: adapter({
          precompress: true,
          pages: 'build',
          assets: 'build',
        }),
      alias: {
        $src: path.resolve('./src'),
        $lib: path.resolve('./src/lib'),
        $utils: path.resolve('./src/lib/utils'),
        $routes: path.resolve('./src/routes'),
        $stores: path.resolve('./src/stores'),
        $assets: path.resolve('./src/assets'),
        $images: path.resolve('./src/assets/images'),
        $components: path.resolve('./src/lib/components'),
        $generators: path.resolve('./static/rails_generators'),
      }
    }

};

export default config;
