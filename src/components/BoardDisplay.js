import { useLoadingDelay } from 'hooks';
import UniversalComponent from './UniversalComponent';

const BoardDisplay = ({
  loaded,
  loading,
  content,
  emptyMessage,
  componentExport,
}) => {
  const { showLoading } = useLoadingDelay({ loaded, loading, timeout: 500 });

  return showLoading ? (
    <UniversalComponent export="SkeletonsList" type="SkeletonCard" />
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
            <UniversalComponent
              export={componentExport}
              key={item.id}
              {...item}
            />
          ))}
    </div>
  );
};

export { BoardDisplay };
