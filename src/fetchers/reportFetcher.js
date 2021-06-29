import { WEB_API } from 'configs';
import request, { handleGeneralError } from './index';

export const getReportList = ({ page = 1, perPage = 20 }) => {
  return request(WEB_API, {
    url: `/report/all?page=${page}&perPage=${perPage}`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
