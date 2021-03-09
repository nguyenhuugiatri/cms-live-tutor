import { WEB_API } from 'configs';
import request, { handleGeneralError } from './index';

export const getListWaitingApproval = payload => {
  return request(WEB_API, {
    url: '/tutor/list/approval',
    method: 'GET',
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const updateTutor = payload => {
  return request(WEB_API, {
    url: `tutor/update/approval`,
    method: 'PUT',
    data: payload,
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};
