import { useRequests } from 'hooks/redux/useRequests';
import { Spinner } from 'react-bootstrap';
import { Request } from './request';

const Requests = () => {
  const { requests, loading } = useRequests();

  return loading ? (
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
      {requests.length === 0
        ? 'No requests awaiting approval'
        : requests.map((req) => <Request key={req.id} {...req} />)}
    </div>
  );
};

export { Requests };
