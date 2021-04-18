import loadable from '@loadable/component';

const UniversalComponent = loadable(
  (props) => import(`${props.page || 'components'}`),
  {
    resolveComponent: (mod, props) => mod[props.export],
  }
);

export default UniversalComponent;
