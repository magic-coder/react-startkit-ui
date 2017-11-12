import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import Dialog from '../dialog';

import './scss';

/**
 * 创建 动作面板
 * 
 * @param {any} options 
 */
function createActionSheet(type, options) {
  const props = Object.assign({}, {
    type, // 动作面包类型. 'normal', 'share', 'custom'
    layout: 'list', // 列表布局, only type='narmal'. 'list', 'grid'
    listAlign: 'center', // 列表布局, only layout='list'. 'center', 'left'
    columnNum: 3, // 列表布局, only layout='grid'
    title: '',
    message: '',
    options: [],
    cancelButtonText: '取消',
    cancelButtonRemove: false, // 是否有取消按钮
    maskClosable: true,
    closable: false, // 是否显示关闭按钮
    callback: () => {},
    prefixClass: 'action-sheet',
    style: {},
    className: '',
    wrapClassName: '',
    wrapProps: {},
    maskTransitionName: '',
    transitionName: '',
  }, options);

  const div = document.createElement('div');
  document.body.appendChild(div);

  // 关闭回调函数. 删除生成的 DOM
  function close() {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  // 点击回调
  function clickCallback(index, rowIndex = 0) {
    const res = props.callback(index, rowIndex);
    if (res && res.then) {
      res.then(() => {
        close();
      });
    } else {
      close();
    }
  }

  // action-sheet 内容
  let children;

  const titleDOM = [
    props.title ? <h3 key="0" className={`${props.prefixClass}__title`}>{props.title}</h3> : null,
    props.message ? <div key="1" className={`${props.prefixClass}__message`}>{props.message}</div> : null,
  ];
  const cancelButtonDOM = props.cancelButtonRemove ? null : (
    <div
      className={`${props.prefixClass}__button__cancel`}
      onClick={close}
      role="button"
      tabIndex="-1"
    >
      {props.cancelButtonText}
    </div>
  );

  let listGroup;
  let contentClasses;

  switch (props.type) {
    case 'normal':
      contentClasses = classNames(
        `${props.prefixClass}__normal`,
        {
          [`${props.prefixClass}--align-${props.listAlign}`]: props.layout === 'list',
        },
      );

      // list button group
      listGroup = props.options.map((item, index) => {
        // button item props
        const key = `action-sheet-button-item-${index}`;

        const columnStyle = {};
        if (props.layout === 'grid') {
          columnStyle.width = `${100 / props.columnNum}%`;
        }
        const itemProps = {
          style: Object.assign({}, columnStyle, item.style),
          className: classNames(
            `${props.prefixClass}__button__list__item`,
            {
              [`${item.className}`]: item.className,
            },
          ),
          onClick: () => { clickCallback(index); },
          role: 'button',
          key,
        };

        // 图标
        let thumb;
        if (item.thumb) {
          thumb = typeof item.thumb === 'string' ? <img src={item.thumb} alt="" /> : item.thumb;
        }

        return (
          <div {...itemProps}>
            <div className={`${props.prefixClass}__button__list__item__content`}>
              {item.thumb ? <span className={`${props.prefixClass}__button__list__item__thumb`}>{thumb}</span> : null}
              <span className={`${props.prefixClass}__button__list__item__text`}>{item.name}</span>
            </div>
          </div>
        );
      });

      children = (
        <div className={contentClasses}>
          {titleDOM}
          <div
            className={`${props.prefixClass}__button__list ${props.prefixClass}__button__list--${props.layout}`}
            role="group"
          >
            {listGroup}
          </div>
          {cancelButtonDOM}
        </div>
      );
      break;
    case 'share':
      listGroup = props.options.map((item, rowIndex) => {
        const keyRow = `action-sheet-share-row-${rowIndex}`;
        const rowDOM = item.list.map((columnItem, columnIndex) => {
          const keyColumn = `action-sheet-share-item-${columnIndex}`;
          const itemProps = {
            style: columnItem.style,
            className: classNames(
              `${props.prefixClass}__share__list__item`,
              {
                [`${columnItem.className}`]: columnItem.className,
              },
            ),
            onClick: () => { clickCallback(columnIndex, rowIndex); },
            role: 'button',
            key: keyColumn,
          };

          // 图标
          let thumb;
          if (columnItem.thumb) {
            thumb = typeof columnItem.thumb === 'string' ? <img src={columnItem.thumb} alt="" /> : columnItem.thumb;
          }

          return (
            <div {...itemProps}>
              <div className={`${props.prefixClass}__share__list__item__content`}>
                {columnItem.thumb ? <span className={`${props.prefixClass}__share__list__item__thumb`}>{thumb}</span> : null}
                <span className={`${props.prefixClass}__share__list__item__text`}>{columnItem.name}</span>
              </div>
            </div>
          );
        });

        return (
          <div
            className={`${props.prefixClass}__share__list__row`}
            key={keyRow}
          >
            {item.title ? <div className={`${props.prefixClass}__share__list__row__header`}>{item.title}</div> : null }
            <div className={`${props.prefixClass}__share__list__row__body`}>
              {rowDOM}
            </div>
          </div>
        );
      });

      children = (
        <div className={`${props.prefixClass}__share`}>
          {titleDOM}
          <div
            className={classNames(
              `${props.prefixClass}__share__list`,
              {
                [`${props.prefixClass}__share__list--simple`]: !props.title && !props.message, // 简单模式
              },
            )}
            role="group"
          >
            {listGroup}
          </div>
          {cancelButtonDOM}
        </div>
      );
      break;
    case 'custom':
      contentClasses = classNames(
        `${props.prefixClass}__custom`,
      );

      // list button group
      listGroup = props.content;

      children = (
        <div className={contentClasses}>
          {titleDOM}
          <div
            className={`${props.prefixClass}__custom__content`}
          >
            {listGroup}
          </div>
          {cancelButtonDOM}
        </div>
      );
      break;
    default:
      break;
  }

  const wrapClasses = classNames(
    props.wrapClassName,
  );

  const actionSheetClasses = classNames(
    {
      [`${props.prefixClass}--${props.type}`]: true,
    },
    props.className,
  );

  ReactDOM.render(
    <Dialog
      visible
      title=""
      footer=""
      prefixClass={props.prefixClass}
      style={props.style}
      className={actionSheetClasses}
      wrapClassName={wrapClasses}
      closable={props.closable}
      maskClosable={props.maskClosable}
      onClose={close}
      wrapProps={props.wrapProps}
      transitionName={props.transitionName || 'slide-up'}
      maskTransitionName={props.maskTransitionName || 'fade'}
    >
      {children}
    </Dialog>,
    div,
  );

  // 返回 关闭函数, 方便外部可以控制关闭
  return {
    close,
  };
}


export default {
  showNormal(options) {
    return createActionSheet('normal', options);
  },
  showShare(options) {
    const config = Object.assign({}, {
      title: '分享到',
      cancelButtonRemove: true,
    }, options);
    console.log(config);

    return createActionSheet('share', config);
  },
  showCustom(options) {
    return createActionSheet('custom', options);
  },
};

