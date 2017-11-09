/**
 * 获取 平台标识
 * 
 * @export
 * @param {any} platformStrc 
 * @returns 
 */
export default function getPlatform(platformStrc) {
  if (platformStrc !== 'auto') {
    return platformStrc;
  }

  const UA = navigator.userAgent;
  const isAndroid = UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1;

  let platform = 'ios';
  if (isAndroid) {
    platform = 'android';
  }

  return platform;
}
