import { createApp } from 'vue'
import App from './App.vue'
import { createVant } from 'vant'
import router from './router'

const app = createApp(App)
const vant = createVant()

app.use(vant)
app.use(router)
app.use(NavBar)
app.use(Tabbar)
app.use(TabbarItem)

app.mount('#app')
