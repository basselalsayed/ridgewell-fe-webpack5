import loadable from '@loadable/component';

export default loadable((props) => import(`${props.page || 'components'}`), {
  resolveComponent: (mod, props) => mod[props.export],
});
