import { lazyLoad } from 'utils/loadable';

export const TutorList = lazyLoad(
  () => import('./index'),
  module => module.TutorList,
);
