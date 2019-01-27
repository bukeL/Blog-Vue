//引入自己写好的组件
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import List from '@/components/List/List'
import Detail from '@/components/Detail/Detail'
import MyLeftBar from '@/components/Common/fore_end/MyLeftBar'
import MyRightBar from '@/components/Common/fore_end/MyRightBar'
import AdminLogin from '@/components/Admin/AdminLogin/Login'
import AdminHome from '@/components/Admin/AdminHome/AdminHome'
import AllPosts from '@/components/Admin/AllPosts/AdminPosts'
import AddPosts from '@/components/Admin/AddPosts/AdminAddPosts'
import Category from '@/components/Admin/Category/AdminCategory'
import AdminUser from '@/components/Admin/User/AdminUser'
import MyAside from '@/components/Common/Backstage/MyAside'
import MyNavbar from '@/components/Common/Backstage/MyNavbar'
import Personal from '@/components/Admin/Personal/AdminPersonal'
Vue.use(Router)  //注册全局路由 $router 和$route
//将所有组件挂载

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name:'Home'
      }
    },
    {
      path: '/home',
      name: 'Home',
      components: {
      	main:Home,
      	left:MyLeftBar,
      	right:MyRightBar
      }
    },
    {
      path: '/list',
      name: 'List',
      components: {
      	main:List,
      	left:MyLeftBar,
      	right:MyRightBar
      }
    },
    {
      path: '/detail',
      name: 'Detail',
       components: {
      	main:Detail,
      	left:MyLeftBar,
      	right:MyRightBar
      }
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
       components: {
        main:AdminLogin,
      }
    },
    {
      path: '/admin/home',
      name: 'AdminHome',
       components: {
        main:AdminHome,
        left:MyAside,
        right:MyNavbar
      }
    },
    {
      path: '/admin/allposts',
      name: 'AllPosts',
       components: {
        main:AllPosts,
        left:MyAside,
        right:MyNavbar
      }
    },
    {
      path: '/admin/addposts',
      name: 'AddPosts',
       components: {
        main: AddPosts,
        left:MyAside,
        right:MyNavbar
      }
    },
      {
      path: '/admin/category',
      name: 'Category',
       components: {
        main: Category,
        left:MyAside,
        right:MyNavbar
      }
    },
     {
      path: '/admin/user',
      name: 'AdminUser',
       components: {
        main: AdminUser,
        left:MyAside,
        right:MyNavbar
      }
    },
    {
      path: '/admin/personal',
      name: 'Personal',
       components: {
        main: Personal,
        left:MyAside,
        right:MyNavbar
      }
    },
  ]
})
