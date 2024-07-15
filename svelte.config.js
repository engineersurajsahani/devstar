import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

export default {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/components',
      $lib: 'src/lib',
      $routes: 'src/routes',
    }
  }
};
