import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { makeTotal } from './selectors';
import qs from 'query-string';
import useActions from 'hooks/useActions';
import { actions } from './slice';

export const usePagination = () => {
  const total = useSelector(makeTotal);
  const history = useHistory();
  const location = useLocation();

  const currentPage = useMemo(() => {
    const page = qs.parse(location.search);
    return page?.page || 1;
  }, [location.search]);

  const onChange = page => {
    history.push({
      search: `?page=${page}`,
    });
  };

  return { total, onChange, current: currentPage };
};

export const useHooks = () => {
  return {
    selectors: {},
    handlers: {},
  };
};
