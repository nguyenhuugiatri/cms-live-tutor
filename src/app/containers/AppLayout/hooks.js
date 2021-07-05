import { makeSelectIsAuthenticated } from 'app/containers/Login/selectors';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { privateRoutes } from './routes';

export const useHooks = () => {
  const isAuthenticated = useSelector(makeSelectIsAuthenticated);

  return {
    selectors: {
      isAuthenticated,
    },
    handler: {},
  };
};

export const useAuthenticatedRedirect = () => {
  const history = useHistory();
  const location = useLocation();
  const isRedirect = ['/login', '/register'].includes(location.pathname);
  const { from } = location.state || { from: { pathname: '/' } };
  const isAuthenticated = useSelector(makeSelectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated && isRedirect) {
      history.replace(from);
    }
  }, [isAuthenticated, history, from, isRedirect]);
};

export const useActivatedMenu = () => {
  const location = useLocation();

  const activ = useMemo(() => {
    if (location.pathname === '/') {
      return privateRoutes[0].key;
    } else {
      return privateRoutes.find(route => location.pathname.includes(route.key))
        ?.key;
    }
  }, [location]);

  return {
    active: activ,
  };
};
export default useHooks;
