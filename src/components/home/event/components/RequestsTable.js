import { Table } from 'react-bootstrap';
import { capitalize, formatted } from 'Helpers';

const RequestRow = ({ from, index, type, until }) => (
  <tr>
    <td>{index + 1}</td>
    <td>{type && capitalize(type)}</td>
    <td>{from && formatted(from, 'popover')}</td>
    <td>{until && formatted(until, 'popover')}</td>
  </tr>
);

const RequestsTable = ({ requests }) => {
  const headerRow = (
    <thead>
      <tr>
        <th>#</th>
        <th>Type</th>
        <th>From</th>
        <th>Until</th>
      </tr>
    </thead>
  );

  const requestRows =
    requests &&
    requests.map((request, idx) => (
      <RequestRow key={request.id} {...request} index={idx} />
    ));

  return (
    <Table striped bordered hover size="sm">
      {headerRow}
      <tbody>{requestRows}</tbody>
    </Table>
  );
};

export { RequestsTable };
