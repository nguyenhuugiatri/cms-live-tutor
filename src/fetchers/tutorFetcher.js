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
    .then(response => {
      return response.data;
    })
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const getListTutor = ({ page = 1, perPage = 10 }) => {
  return request(WEB_API, {
    url: `tutor/all?page=${page}&perPage=${perPage}`,
    method: 'GET',
  })
    .then(response => response)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const getTutorDetail = payload => {
  return request(WEB_API, {
    url: `tutor/detail/${payload}`,
    method: 'GET',
  })
    .then(response => response)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};
