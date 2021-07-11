import loadable from '@loadable/component';

export default loadable((props) => import(`./${props.page}`));

// const old = loadable((props) =>
//   import(`./${props.name}`).then(
//     (module) => module.default || module[props.name]
//   )
// );
