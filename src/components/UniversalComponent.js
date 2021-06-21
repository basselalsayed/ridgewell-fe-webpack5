import loadable from '@loadable/component';

const UniversalComponent = loadable((props) =>
  import(`components/${props.page}`)
);

export default UniversalComponent;
