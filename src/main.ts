import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';

const app = createApp(App);

app.config.globalProperties.$router = router;

app.use(Antd);
app.use(router);
app.use(createPinia().use(piniaPluginPersistedState));
app.mount('#app');
