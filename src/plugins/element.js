import Vue from 'vue'
import {
  Button, Form, FormItem,
  Input, Message, Container,
  Header, Aside, Main,
  Menu, Submenu, MenuItem,
  MenuItemGroup, MessageBox,
  Breadcrumb, BreadcrumbItem,
  Card, Row, Col, Table,
  TableColumn, Switch, Tooltip,
  Pagination, Dialog, Dropdown,
  DropdownItem, DropdownMenu, DatePicker,
  Select, Option
} from 'element-ui'
import 'element-ui/lib/theme-chalk/base.css'

Vue.use(Button)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$messageBox = MessageBox
Vue.prototype.$message = Message
