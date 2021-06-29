import { lazyLoad } from 'utils/loadable';

export const Fee = lazyLoad(
  () => import('./index'),
  module => module.Fee,
);
