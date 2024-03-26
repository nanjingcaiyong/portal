import { createApp } from 'vue';
import App from './app.vue';
import 'tailwindcss/tailwind.css';

async function bootstrap () {
  const app = createApp(App);
  app.mount('#demo');
}

bootstrap();