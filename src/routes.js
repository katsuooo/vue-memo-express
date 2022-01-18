import Home from './components/Home.vue'
//import Memobg from './components/Memobg.vue'
//import Memooutline from './components/Memooutline.vue'
import Panel from './components/Panel.vue'
import Error from './components/404.vue'
import Memo from './components/Memo.vue'
import Filtertest from './components/filterTest.vue'
const routes = [
    { path: '/', component: Home, name: 'home' },
    //{ path: '/memo-bg', component: Memobg, name: 'memo-bg' },
    //{ path: '/memo-outline', component: Memooutline, name: 'memo-outline' },
    { path: '/panel', component: Panel, name: 'panel' },
    { path: '/404', component: Error, name: '404' },
    { path: '/memo/:color', component: Memo, name: 'memo' },
    { path: '/Filtertest', component: Filtertest, name: 'filter-test' },
];
export default routes;