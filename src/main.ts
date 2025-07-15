import { createApp } from 'vue'
import App from './App.vue'
import 'vant/lib/index.css'
import { Button, Slider, Image, NavBar, Tabbar, TabbarItem } from 'vant'

const app = createApp(App)

app.use(Button)
app.use(Slider)
app.use(Image)
app.use(NavBar)
app.use(Tabbar)
app.use(TabbarItem)

app.mount('#app')
