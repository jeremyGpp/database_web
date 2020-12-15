import Vue from 'vue'
import { Button, Form, FormItem, Input } from 'element-ui'
import 'element-ui/lib/theme-chalk/base.css'
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

Vue.use(Button)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Input)
Vue.component(CollapseTransition.name, CollapseTransition)
