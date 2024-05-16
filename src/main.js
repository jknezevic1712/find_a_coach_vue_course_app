import { createApp } from 'vue';

// components
import App from './App.vue';
// routing
import router from './router';
// store
import store from './store';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
