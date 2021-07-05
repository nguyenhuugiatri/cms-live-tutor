import { Login } from 'app/containers/Login/Loadable';
import { Register } from 'app/containers/Register/Loadable';
import { TutorList } from 'app/containers/TutorList/Loadable';
import { UserList } from 'app/containers/UserList/Loadable';
import { Transaction } from 'app/containers/Transaction/Loadable';
import { Report } from 'app/containers/Report/Loadable';
import { Fee } from 'app/containers/Fee/Loadable';
import { TutorDetail } from 'app/containers/TutorDetail';

export const privateRoutes = [
  {
    path: '/',
    component: TutorList,
    key: 'home',
    showInHeader: false,
  },
  {
    path: '/tutors',
    component: TutorList,
    key: 'tutor',
    showInHeader: true,
  },
  {
    path: '/tutors/:id',
    component: TutorDetail,
    key: 'tutorDetail',
    showInHeader: false,
  },
  {
    path: '/users',
    component: UserList,
    key: 'user',
    showInHeader: true,
  },
  {
    path: '/transactions',
    component: Transaction,
    key: 'transaction',
    showInHeader: true,
  },
  {
    path: '/reports',
    component: Report,
    key: 'report',
    showInHeader: true,
  },
  {
    path: '/fees',
    component: Fee,
    key: 'fee',
    showInHeader: true,
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
