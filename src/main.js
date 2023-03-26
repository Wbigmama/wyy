import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Button, Swipe, SwipeItem, List, Cell, Toast, PullRefresh, Popup, Progress, Field   } from 'vant';
import 'vant/lib/index.css';

import VueCookies from 'vue-cookies'
// rem样式
import 'lib-flexible/flexible'

// import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Button).use(Swipe).use(SwipeItem).use(List).use(Cell).use(Toast).use(PullRefresh).use(Popup).use(Progress).use(Field)

// app.config.globalProperties.$cookies = VueCookies

app.provide('$cookies', VueCookies);
app.mount('#app')
