import { SkeletonsList } from 'components';
import { useLoadingDelay } from 'hooks';
import UniversalComponent from './UniversalComponent';

const BoardDisplay = ({
  loaded,
  loading,
  content,
  emptyMessage,
  componentPath,
}) => {
  const { showLoading } = useLoadingDelay({ loaded, loading, timeout: 1000 });

  return showLoading ? (
    <SkeletonsList type="SkeletonCard" />
  ) : (
    <div
      style={{
        maxHeight: window.innerHeight - 150,
        overflow: 'auto',
      }}
    >
      {content.length === 0
        ? emptyMessage
        : content.map((item) => (
            <UniversalComponent page={componentPath} key={item.id} {...item} />
          ))}
    </div>
  );
};

export default BoardDisplay;
