import { createApp } from 'vue'
import App from './App.vue'
// 引入 Vant 全部組件
import Vant from 'vant'
// 引入 Vant 樣式
import 'vant/lib/index.css'
// 引入路由
import router from './router'

// 建立應用
const app = createApp(App)

// 使用 Vant
app.use(Vant)

// 使用路由
app.use(router)

// 掛載應用
app.mount('#app')
