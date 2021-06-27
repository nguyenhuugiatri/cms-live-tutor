import { WEB_API } from 'configs';
import request, { handleGeneralError } from './index';

export const getListUser = ({ page = 1, perPage = 10 }) => {
  return request(WEB_API, {
    url: `user/all?page=${page}&perPage=${perPage}`,
    method: 'GET',
  })
    .then(response => response)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const manageActivated = ({ id, isActivated }) => {
  return request(WEB_API, {
    url: 'user/manageActivated',
    method: 'POST',
    data: {
      id,
      isActivated,
    },
  })
    .then(response => response)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};
