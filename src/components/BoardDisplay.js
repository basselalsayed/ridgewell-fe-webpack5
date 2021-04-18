import { Spinner } from 'react-bootstrap';
import UniversalComponent from './UniversalComponent';

const BoardDisplay = ({ loading, content, emptyMessage, componentExport }) =>
  loading ? (
    <Spinner
      style={{
        position: 'absolute',
        color: 'green',
        left: '50%',
        top: '50%',
        marginLeft: '-1rem',
        marginTop: '1rem',
      }}
      animation="border"
    />
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

export { BoardDisplay };
