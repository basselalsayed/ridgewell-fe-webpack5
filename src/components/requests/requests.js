import { Request } from './request';

const Requests = ({ requests }) =>
  requests && (
    <div
      style={{
        maxHeight: window.innerHeight - 150,
        overflow: 'auto',
      }}
    >
      {requests.map((req) => (
        <Request key={req.id} {...req} />
      ))}
    </div>
  );

export { Requests };
