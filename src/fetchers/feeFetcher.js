import { WEB_API } from 'configs';
import request, { handleGeneralError } from './index';

export const getFeeList = () => {
  return request(WEB_API, {
    url: `/payment/fee`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const updateFee = ({ price, id }) => {
  return request(WEB_API, {
    url: `/payment/fee`,
    method: 'PUT',
    data: {
      price,
      id,
    },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
