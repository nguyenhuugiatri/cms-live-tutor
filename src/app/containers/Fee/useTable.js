import { Form, Space } from 'antd';
import Button from 'app/components/Button';
import useActions from 'hooks/useActions';
import { EditableCell } from 'hooks/useTable';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeListFee } from './selectors';
import { actions } from './slice';

export const useTable = () => {
  const [form] = Form.useForm();
  const feeList = useSelector(makeListFee);
  const [editingKey, setEditingKey] = useState('');
  const { getFeeList, updateFee } = useActions(
    { getFeeList: actions.getFeeList, updateFee: actions.updateFee },
    [actions],
  );

  useEffect(() => {
    getFeeList();
  }, [getFeeList]);

  const edit = record => {
    form.setFieldsValue({
      price: '',
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancelEdit = () => {
    setEditingKey('');
  };

  const save = ({ id }) => {
    const { price } = form.getFieldValue();
    updateFee({ price, id });
    getFeeList();
    setEditingKey('');
  };

  const columns = [
    { title: 'Key', dataIndex: 'key', key: 'key' },
    { title: 'Price', dataIndex: 'price', key: 'price', editable: true },
    {
      title: 'Action',
      key: 'action',
      width: '200px',
      render: (_, record) => {
        if (!isEditing(record)) {
          return (
            <div className="d-flex">
              <Button onClick={() => edit(record)}>Edit</Button>
            </div>
          );
        } else {
          return (
            <Space>
              <Button onClick={cancelEdit}>Cancel</Button>
              <Button type="primary" onClick={() => save(record)}>
                Save
              </Button>
            </Space>
          );
        }
      },
    },
  ];

  const isEditing = useCallback(
    record => {
      return record.id === editingKey;
    },
    [editingKey],
  );

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'price' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return {
    table: {
      columns: mergedColumns,
      dataSource: feeList,
      components: {
        body: {
          cell: EditableCell,
        },
      },
    },
    form,
  };
};
