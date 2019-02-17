//引入自己写好的组件
import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home/Home'
// import List from '@/components/List/List'
// import Detail from '@/components/Detail/Detail'
// import MyLeftBar from '@/components/Common/fore_end/MyLeftBar'
// import MyRightBar from '@/components/Common/fore_end/MyRightBar'
// import AdminLogin from '@/components/Admin/AdminLogin/Login'
// import AdminHome from '@/components/Admin/AdminHome/AdminHome'
// import AllPosts from '@/components/Admin/AllPosts/AdminPosts'
// import AddPosts from '@/components/Admin/AddPosts/AdminAddPosts'
// import Category from '@/components/Admin/Category/AdminCategory'
// import AdminUser from '@/components/Admin/User/AdminUser'
// import AdminAside from '@/components/Common/Backstage/AdminAside'
// import AdminNavbar from '@/components/Common/Backstage/AdminNavbar'
// import Personal from '@/components/Admin/Personal/AdminPersonal'
// import UserLogin from '@/components/User/UserLogin/userLogin'
// import UserRegister from '@/components/User/UserRegister/userRegister'
const Home = () => import ('@/components/Home/Home')
const List = () => import ('@/components/List/List')
const Detail = () => import ('@/components/Detail/Detail')
const MyLeftBar = () => import ('@/components/Common/fore_end/MyLeftBar')
const MyRightBar = () => import ('@/components/Common/fore_end/MyRightBar')
const AdminLogin = () => import ('@/components/Admin/AdminLogin/Login')
const AdminHome = () => import ('@/components/Admin/AdminHome/AdminHome')
const AllPosts = () => import ('@/components/Admin/AllPosts/AdminPosts')
const Category = () => import ('@/components/Admin/Category/AdminCategory')
const AdminUser = () => import ('@/components/Admin/User/AdminUser')
const AdminAside = () => import ('@/components/Common/Backstage/AdminAside')
const AdminNavbar = () => import ('@/components/Common/Backstage/AdminNavbar')
const Personal = () => import ('@/components/Admin/Personal/AdminPersonal')
const UserLogin = () => import ('@/components/User/UserLogin/userLogin')
const UserRegister = () => import ('@/components/User/UserRegister/userRegister')
const UserHome = () => import ('@/components/User/UserHome/userHome')
const UserAside = () => import ('@/components/Common/Backstage/UserAside')
const UserNavbar = () => import ('@/components/Common/Backstage/UserNavbar')
const AddPosts = () => import ('@/components/User/AddPosts/UserAddPosts')
const UserPersonal = () => import ('@/components/User/UserPersonal/UserPersonal')
const UserAllPosts = () => import ('@/components/User/UserAllPosts/UserAllPosts')
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
        left:AdminAside,
        right:AdminNavbar
      }
    },
    {
      path: '/admin/allposts',
      name: 'AllPosts',
       components: {
        main:AllPosts,
        left:AdminAside,
        right:AdminNavbar
      }
    },
    // {   管理员登录不写文章,省的麻烦,写的话post文章表需要连admin表和user表两个表,麻烦
    //   path: '/admin/addposts',
    //   name: 'AddPosts',
    //    components: {
    //     main: AddPosts,
    //     left:AdminAside,
    //     right:AdminNavbar
    //   }
    // },
      {
      path: '/admin/category',
      name: 'Category',
       components: {
        main: Category,
        left:AdminAside,
        right:AdminNavbar
      }
    },
     {
      path: '/admin/user',
      name: 'AdminUser',
       components: {
        main: AdminUser,
        left:AdminAside,
        right:AdminNavbar
      }
    },
    {
      path: '/admin/personal',
      name: 'Personal',
       components: {
        main: Personal,
        left:AdminAside,
        right:AdminNavbar
      }
    },
    {
      path: '/User/login',
      name: 'UserLogin',
       components: {
        main: UserLogin,
      }
    },
    {
      path: '/User/register',
      name: 'UserRegister',
       components: {
        main: UserRegister,
      }
    },
    {
      path: '/User/home',
      name: 'UserHome',
       components: {
        main:UserHome,
        left:UserAside,
        right:UserNavbar
      }
    },
    {   
      path: '/User/addposts',
      name: 'AddPosts',
       components: {
        main: AddPosts,
        left:UserAside,
        right:UserNavbar
      }
    },
    {   
      path: '/User/userAllPosts',
      name: 'UserAllPosts',
       components: {
        main: UserAllPosts,
        left:UserAside,
        right:UserNavbar
      }
    },
    {   
      path: '/User/userPersonal',
      name: 'UserPersonal',
       components: {
        main: UserPersonal,
        left:UserAside,
        right:UserNavbar
      }
    },
  ]
})
