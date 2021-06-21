import { Spinner as BSpinner } from 'react-bootstrap';

const Spinner = () => (
  <BSpinner
    style={{
      position: 'relative',
      color: 'green',
      left: '50%',
      top: '50%',
      marginLeft: '-1rem',
      marginTop: '-1rem',
    }}
    animation="border"
  />
);

export default Spinner;
