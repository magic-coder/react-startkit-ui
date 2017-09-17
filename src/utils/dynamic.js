import Loadable from 'react-loadable';
import Loading from '@/components/Loading';

/**
* 按需加载组件
* @param {*} component 
*
*/
const dynamic = (options) => {
  return Loadable(Object.assign({
    loading: Loading,
    delay: 200,
    timeout: 10000,
  }, options));
};

export default dynamic;
