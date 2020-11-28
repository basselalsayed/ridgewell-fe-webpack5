import { Alert, Form } from 'react-bootstrap';

const Status = ({ status }) => (
  <Form.Row>
    <Alert
      style={{ marginTop: 10, width: '100%', textAlign: 'center' }}
      variant={status === 'Success' ? 'success' : 'danger'}
    >
      {status}
    </Alert>
  </Form.Row>
);

export { Status };
