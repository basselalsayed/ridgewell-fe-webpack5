import UniversalComponent from 'components/UniversalComponent';

const SkeletonsList = ({ type }) =>
  Array.from(Array(6).keys()).map((n) => (
    <UniversalComponent key={n} page={`skeletons/${type}`} export={type} />
  ));

export default SkeletonsList;
