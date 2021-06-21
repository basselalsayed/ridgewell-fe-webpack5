import { Shimmer, SkeletonElement } from 'components';
// import UniversalComponent from 'components/UniversalComponent';

const SkeletonCard = ({ theme }) => (
  <div className={`skeletonWrapper ${theme || 'light'}`}>
    <div className="skeletonCard">
      <SkeletonElement type="title" />
      <SkeletonElement type="text" />
      <SkeletonElement type="text" />
      <SkeletonElement type="text" />
      <Shimmer />
    </div>
  </div>
);

export default SkeletonCard;
