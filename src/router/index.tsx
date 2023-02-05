import { Navigate } from "react-router-dom";
import { lazy } from "react";

const LoginView = lazy(() => import("@/pages/loginView/loginView"))
const RegisterView = lazy(() => import("@/pages/registerView/registerView"))
const NavView = lazy(() => import("@/pages/navView/navView"))
const IndexView = lazy(() => import("@/pages/indexView/indexView"))
const ProfileView = lazy(() => import("@/pages/profileView/profileView"))
const EditProfileView = lazy(() => import("@/pages/editProfileView/editProfileView"))
const PubArticleView = lazy(() => import("@/pages/pubArticleView/pubArticleView"))
const ArticleView = lazy(() => import("@/pages/articleView/articleView"))
const CollectView = lazy(() => import("@/pages/collectView/collectView"))
const ReportView = lazy(() => import("@/pages/reportView/reportView"))
const CommentList = lazy(() => import("@/pages/commentList/commentList"))
const PraiseView = lazy(() => import("@/pages/praiseView/praiseView"))
const InfoView = lazy(() => import("@/pages/infoView/infoView"))
const UserListView = lazy(() => import("@/pages/userListView/userListView"))


export default [
  {
    path: '/login',
    element: <LoginView/>
  },
  {
    path: '/register',
    element: <RegisterView/>
  },
  {
    path: '/index',
    element: <NavView/>,
    children: [
      {
        path: 'home',
        meta: {
          p_index: 'home'
        },
        element: <IndexView/>
      },
      {
        path: 'profile',
        meta: {
          p_index: 'profile'
        },
        element: <ProfileView/>
      },
      {
        path: '/index',
        element: <Navigate to='home'/>
      },
    ]
  },
  {
    path: '/follow/:id',
    element: <UserListView/>
  },
  {
    path: '/fans/:id',
    element: <UserListView/>
  },
  {
    path: '/article/:id',
    element: <ArticleView/>
  },
  {
    path: '/comment/:id',
    element: <CommentList/>
  },
  {
    path: '/report/:id',
    element: <ReportView/>
  },
  {
    path: '/info',
    element: <InfoView/>
  },
  {
    path: '/collect',
    element: <CollectView/>
  },
  {
    path: '/praise',
    element: <PraiseView/>
  },
  {
    path: '/browse',
    element: <PraiseView/>
  },
  {
    path: '/editProfile',
    element: <EditProfileView/>
  },
  {
    path: '/pubArticle',
    element: <PubArticleView/>
  },
  {
    path: '/',
    element: <Navigate to='/login'/>
  }
]