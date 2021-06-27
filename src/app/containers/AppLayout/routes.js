import { Home } from 'app/containers/Home/Loadable';
import { Login } from 'app/containers/Login/Loadable';
import { Register } from 'app/containers/Register/Loadable';
import { TutorList } from 'app/containers/TutorList/Loadable';
import { UserList } from 'app/containers/UserList/Loadable';
import { ApprovalTutorList } from 'app/containers/ApprovalTutorList';

export const privateRoutes = [
  {
    path: '/',
    component: ApprovalTutorList,
    key: 'home',
  },
  {
    path: '/tutors',
    component: TutorList,
    key: 'tutor',
  },
  {
    path: '/users',
    component: UserList,
    key: 'user',
  },
];

export const publicRoutes = [
  {
    path: '/login',
    component: Login,
    key: 'login',
  },
  {
    path: '/register',
    component: Register,
    key: 'register',
  },
];
