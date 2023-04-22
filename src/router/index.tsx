import { Navigate } from "react-router-dom";
import { lazy } from "react";

const LoginView = lazy(() => import("@/pages/loginView/loginView"))
const RegisterView = lazy(() => import("@/pages/registerView/registerView"))
const ForgetView = lazy(() => import("@/pages/forgetView/forgetView"))
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
const VideoView = lazy(() => import("@/pages/videoView/videoView"))
const ReportResult = lazy(() => import("@/pages/reportView/reportResult/reportResult"))
const ReportDetail = lazy(() => import("@/pages/reportView/reportDetail/reportDetail"))
const PubVideoView = lazy(() => import("@/pages/pubVideoView/pubVideoView"))
const MyCommentList = lazy(() => import("@/pages/myCommentList/myCommentList"))
const MyArticleList = lazy(() => import("@/pages/myArticleList/myArticleList"))
const MyVideoList = lazy(() => import("@/pages/myVideoList/myVideoList"))
const VideoDetail = lazy(() => import("@/pages/videoDetail/videoDetail"))
const SearchDetail = lazy(() => import("@/pages/searchDetail/searchDetail"))
const NoticeView = lazy(() => import("@/pages/noticeView/noticeView"))
const MessageView = lazy(() => import("@/pages/messageView/messageView"))
const ReplyDetailView = lazy(() => import("@/pages/replyDetailView/replyDetailView"))
const PraiseDetailView = lazy(() => import("@/pages/praiseDetailView/praiseDetailView"))
const ChatView = lazy(() => import("@/pages/chatView/chatView"))
const SendListView = lazy(() => import("@/pages/sendListView/sendListView"))
const PubEventView = lazy(() => import("@/pages/pubEventView/pubEventView"))
const EventDetailView = lazy(() => import("@/pages/eventDetailView/eventDetailView"))
const ErrorView = lazy(() => import("@/pages/errorView/errorView"))
const NoFoundView = lazy(() => import("@/pages/noFoundView/noFoundView"))


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
    path: '/forget',
    element: <ForgetView/>
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
        path: 'video',
        meta: {
          p_index: 'video'
        },
        element: <VideoView/>
      },
      {
        path: 'message',
        meta: {
          p_index: 'message'
        },
        element: <MessageView/>
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
    path: '/report/:id/:type',
    element: <ReportView/>
  },
  {
    path: '/reportResult',
    element: <ReportResult/>
  },
  {
    path: '/reportDetail/:id',
    element: <ReportDetail/>
  },
  {
    path: '/pubVideo',
    element: <PubVideoView/>
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
    path: '/myComment',
    element: <MyCommentList/>
  },
  {
    path: '/myArticle',
    element: <MyArticleList/>
  },
  {
    path: '/myVideo',
    element: <MyVideoList/>
  },
  {
    path: '/video/:id',
    element: <VideoDetail/>
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
    path: '/pubEvent',
    element: <PubEventView/>
  },
  {
    path: '/search',
    element: <SearchDetail/>
  },
  {
    path: '/notice/:id',
    element: <NoticeView/>
  },
  {
    path: '/replyDetail',
    element: <ReplyDetailView/>
  },
  {
    path: '/praiseDetail',
    element: <PraiseDetailView/>
  },
  {
    path: '/chat/:to_id/:room_id',
    element: <ChatView/>
  },
  {
    path: '/sendList',
    element: <SendListView/>
  },
  {
    path: '/eventDetail/:id',
    element: <EventDetailView/>
  },
  {
    path: '/error',
    element: <ErrorView/>
  },
  {
    path: '/404',
    element: <NoFoundView/>
  },
  {
    path: '/',
    element: <Navigate to='/login'/>,
    token: false
  }
]