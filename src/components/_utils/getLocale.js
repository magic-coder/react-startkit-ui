/**
 * 获取 组件的语言配置
 * 
 * @param {any} props 
 * @param {any} context 
 * @param {any} componentName 
 * @param {any} getDefaultLocale 
 */
function getComponentLocale(props, context, componentName, getDefaultLocale) {
  let locale = {};

  if (context && context.locale && context.locale.messages[componentName]) {
    locale = context.locale.messages[componentName];
  } else {
    const defaultLocale = getDefaultLocale();
    locale = defaultLocale.default || defaultLocale;
  }

  let result = {
    ...locale,
  };

  // 如果属性有语言配置项, 则合并
  if (props.locale) {
    result = {
      ...result,
      ...props.locale,
    };

    if (props.locale.lang) {
      result.lang = {
        ...locale.lang,
        ...props.locale.lang,
      };
    }
  }

  return result;
}

function getLocaleCode() {}

export {
  getComponentLocale,
  getLocaleCode,
};
