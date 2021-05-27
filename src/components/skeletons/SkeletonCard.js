import UniversalComponent from 'components/UniversalComponent';

const SkeletonCard = ({ theme }) => (
  <div className={`skeletonWrapper ${theme || 'light'}`}>
    <div className="skeletonCard">
      <UniversalComponent export="SkeletonElement" type="title" />
      <UniversalComponent export="SkeletonElement" type="text" />
      <UniversalComponent export="SkeletonElement" type="text" />
      <UniversalComponent export="SkeletonElement" type="text" />
      <UniversalComponent export="Shimmer" />
    </div>
  </div>
);

export { SkeletonCard };
