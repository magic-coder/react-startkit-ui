import React from 'react';
import Icon from '@/components/icon';
import Grid from '@/components/grid';

import iconRefresh from '@/assets/svg/refresh.svg';

const IconDemoSize = () => {
  const size = ['xxs', 'xs', 'sm', 'md', 'lg'];
  const data = size.map((item) => {
    return (
      {
        icon: (<Icon type="comments" size={item} />),
        text: item,
      }
    );
  });
  return (<Grid data={data} columnNum={size.length} hasLine={false} />);
};

const IconDemoColor = () => {
  const color = ['#5f7c8a', '#2095f2', '#fe5621', '#feea3a', '#f34235'];
  const data = color.map((item) => {
    return (
      {
        icon: (<Icon type="comments" style={{ color: item }} />),
        text: item,
      }
    );
  });
  return (<Grid data={data} columnNum={color.length} hasLine={false} />);
};

const IconDemoLists = () => {
  const lists = [
    'all', 'back', 'cart', 'category', 'comments', 'set', 'search', 'loading',
  ];
  const data = lists.map((item) => {
    return (
      {
        icon: (<Icon type={item} style={{ color: '#808080' }} />),
        text: item,
      }
    );
  }).concat([{
    icon: (<Icon type={iconRefresh} style={{ color: '#808080' }} />),
    text: '自定义图标',
  }]);

  return (<Grid data={data} columnNum={3} hasLine={false} />);
};

export default class IconExample extends React.Component {
  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">Icon</div>
          <div className="page__desc">图标</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">大小</div>
            <div className="demo__preview__content">
              <IconDemoSize />
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">颜色</div>
            <div className="demo__preview__content">
              <IconDemoColor />
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">列表</div>
            <div className="demo__preview__content">
              <IconDemoLists />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
