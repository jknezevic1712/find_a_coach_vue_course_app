import { createApp } from 'vue';

// components
import App from './App.vue';
// routing
import router from './router';

const app = createApp(App);

app.use(router);
app.mount('#app');
