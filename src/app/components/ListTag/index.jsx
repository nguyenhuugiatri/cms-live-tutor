import { Tag } from 'antd';
import { memo } from 'react';
import { StyleTags } from './style';

export const ListTag = memo(({ tags = [] }) => {
  return (
    <StyleTags>
      {tags?.map(tag => (
        <Tag color="magenta" key={tag}>
          {tag}
        </Tag>
      ))}
    </StyleTags>
  );
});

export default ListTag;
