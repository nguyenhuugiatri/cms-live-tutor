import { Table as TableAntd } from 'antd';
import { memo } from 'react';
export const Table = memo(({ dataSource, columns, ...rest }) => {
  return (
    <TableAntd
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      {...rest}
    />
  );
});

export default Table;
