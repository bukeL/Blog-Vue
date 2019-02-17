// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import Vuex from 'vuex'
  import myImg from '@/assets/img/default.png'
//配置公共的url
Axios.defaults.baseURL = 'http://127.0.0.1:3000/api/'
//配置axios
Axios.defaults.withCredentials=true
Vue.prototype.$axios = Axios

//使用vuex
Vue.use(Vuex)
let store  = new Vuex.Store({
	state:{
		// userId:'',
		nickname:'',
		avatar:myImg,
		userIsLogin: 'false'
	},
	getters:{
		getNickname(state){
			return state.nickname
		},
		getAvatar(state){
			return state.avatar
		},
		getuserIsLogin(state){
			return state.userIsLogin
		}
		// getUserId(state){
		// 	return state.userId
		// }
	},
	mutations:{
		// updateUserId(state,userId) {
		// 	state.userId = userId
		// 	window.localStorage.setItem('userId', state.userId);
		// },
		updateUserNickname(state,nickname) {
			state.nickname = nickname
			window.localStorage.setItem('nickname', state.nickname);
		},
		updateUserAvatar(state,avatar) {
			state.avatar = avatar
			window.localStorage.setItem('avatar', state.avatar);
		},
		updateUserIsLogin(state,str) {
			state.userIsLogin = str
			// alert(state.userIsLogin)
			window.localStorage.setItem('userIsLogin', state.userIsLogin);
		},
	}
})
//引入公共css
import './assets/css/bootstrap.css'
import animate from 'animate.css'
//y引入公共js
// import 'jquery'
// 引入自己的css
import './assets/css/style.css'
import './assets/css/admin.css'
// import './assets/css/global.css'
import './assets/css/font-awesome.css'

//引入自己的全局组件
import MyLeftBar from './components/Common/fore_end/MyLeftBar.vue'
import MyRightBar from './components/Common/fore_end/MyRightBar.vue'
// import MyCarousel from './components/Home/MyCarousel.vue'
// import MyRank from './components/Home/MyRank.vue'
import MyHot from './components/Common/fore_end/MyHot.vue'
import AdminNavbar from './components/Common/Backstage/AdminNavbar.vue'
import AdminAside from './components/Common/Backstage/AdminAside.vue'
// import MyPostAdd from './components/Admin/AddPosts/AddPost.vue'
// import MyArticle from './components/Home/MyArticle.vue'
// import MyDetail from './components/Common/MyDetail.vue'
//引入别人的插件
import { Swipe, SwipeItem } from 'vue-swipe';

//注册轮播图
Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);
Vue.config.productionTip = false

//注册自己的全局组件
Vue.component(MyLeftBar.name,MyLeftBar)
Vue.component(MyRightBar.name,MyRightBar)
// Vue.component(MyCarousel.name,MyCarousel)
// Vue.component(MyRank.name,MyRank)
Vue.component(MyHot.name,MyHot)

Vue.component(AdminNavbar.name,AdminNavbar)
Vue.component(AdminAside.name,AdminAside)
// Vue.component(MyPostAdd.name,MyPostAdd)
// Vue.component(MyArticle.name,MyArticle)
// Vue.component(MyDetail.name,MyDetail)

//定义全局事件过滤器
import Moment from 'moment'
//{{ 'xxx' | convertTime('')}}
Vue.filter('convertTime',function (data,formatStr) {
	return Moment(data).format(formatStr)
})

//1 引入vuex
//2 创建store
//3 配置store中的数据/存/取
//4 将store对象关联进Vue实例
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
