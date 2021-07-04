import { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
export const usePagination = ({ total = 0 }) => {
  const history = useHistory();
  const location = useLocation();

  const currentPage = useMemo(() => {
    const page = qs.parse(location.search);
    return +page?.page || 1;
  }, [location.search]);

  const onChange = page => {
    history.push({
      search: `?page=${page}`,
    });
  };

  return { total, onChange, current: currentPage };
};
