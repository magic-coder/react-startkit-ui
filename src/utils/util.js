/**
 * 获取浏览器相关信息
 * @type {{info: {mobile, android, ios, iPhone, iPad, weixin, qq}, language: string}}
 */
const browser = {
  info() {
    const UA = navigator.userAgent;
    return {
      mobile: !!UA.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      android: UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1, // android终端
      ios: !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      iPhone: UA.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: UA.indexOf('iPad') > -1, // 是否iPad
      weixin: UA.indexOf('MicroMessenger') > -1, // 是否微信浏览器
      qq: UA.match(/\sQQ/i) === 'qq', // 是否QQ浏览器
    };
  },
  language: (navigator.browserLanguage || navigator.language).toLowerCase(),
};

/**
 * 判断目标是否是函数
 * 
 * @param {*} target 
 * @returns {Boolean}
 */
const isFunction = (target) => {
  return typeof target === 'function';
};

export {
  browser,
  isFunction,
};
