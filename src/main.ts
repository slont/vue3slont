import {createApp} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {setupComponents} from '@/plugins/components'
import './assets/sass/global.sass'

const app = createApp(App)
    .use(router).use(store)

setupComponents(app)

app.mount('#app')
