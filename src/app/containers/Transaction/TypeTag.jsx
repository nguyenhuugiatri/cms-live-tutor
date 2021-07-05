import { Tag } from 'antd';

const action = {
  sell: 'sell',
  buy: 'buy',
  deposit: 'deposit',
  cancel: 'cancel',
  return: 'return ',
};

export const TypeTag = ({ text }) => {
  const color = () => {
    switch (text) {
      case action.sell:
        return 'processing';
      case action.buy:
        return 'error';
      case action.deposit:
        return '#54E346';
      case action.cancel:
        return '#FE5F55';
      case action.return:
        return '#658525';
      default:
        return 'default';
    }
  };
  return <Tag color={color()}>{text}</Tag>;
};

export default TypeTag;
