import { Form, Col } from 'react-bootstrap';

import { Formik } from 'formik';
import * as yup from 'yup';

import { getMin, getMax, plusTwoMonths, plusTwoDays } from 'helpers';

import {
  CountdownCancel,
  NegativeButton,
  SuccessButton,
  Status,
  CenteredSpinner,
} from 'components';

import { today } from 'constants';
import { useCountdown } from 'hooks';
import { useRequests } from 'hooks/redux/useRequests';

const RequestForm = ({ annualLeave, id, from, until, update }) => {
  const { isDelete, isPlaying } = useCountdown();

  const {
    postDeleteRequest,
    postNewRequest,
    postUpdateRequest,
  } = useRequests();

  const schema = yup.object({
    annualLeave: yup.boolean(),
    from: yup
      .date()
      .required('Required')
      .when('annualLeave', (_annualLeave, _schema) =>
        !update && _annualLeave
          ? _schema.min(
              plusTwoMonths(today),
              'Annual Leave must start two months in advance'
            )
          : _schema.min(today, 'Date cannot be in the past')
      ),
    until: yup
      .date()
      .required('Required')
      .when('from', (_from, _schema) =>
        _schema.min(_from, 'Date cannot be behind start')
      )
      .when(['annualLeave', 'from'], (_annualLeave, _from, _schema) =>
        !_annualLeave
          ? _schema.max(plusTwoDays(_from), 'Maximum sick leave is two days')
          : _schema
      ),
  });

  const updateData = { type: 'update', holidayId: id };

  const onSubmit = (formData, { setStatus }) =>
    isDelete
      ? postDeleteRequest(id, setStatus)
      : update
      ? postUpdateRequest({ ...formData, ...updateData }, setStatus)
      : postNewRequest(formData, setStatus);

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      validateOnMount
      initialValues={{
        from,
        until,
        annualLeave,
      }}
    >
      {({
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        status,
        submitCount,
        touched,
        values,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            {!update && (
              <Form.Group as={Col} controlId="validationFormik03">
                <Form.Switch
                  id="annualLeave-switch"
                  label="Annual Leave"
                  name="annualLeave"
                  checked={values.annualLeave}
                  onChange={() => {
                    setFieldValue('annualLeave', !values.annualLeave);
                    // !values.annualLeave && setFieldValue('from', min);
                  }}
                />
              </Form.Group>
            )}
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="validationFormik01">
              <Form.Label>From</Form.Label>
              <Form.Control
                type="date"
                name="from"
                min={getMin(values.annualLeave, update)}
                value={values.from}
                onChange={handleChange}
                isValid={touched.from && !errors.from}
                isInvalid={errors.from}
                disabled={isPlaying || isSubmitting || submitCount > 0}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.from}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationFormik02">
              <Form.Label>Until</Form.Label>
              <Form.Control
                type="date"
                name="until"
                min={values.from}
                max={getMax(values.annualLeave, values.from)}
                value={values.until}
                onChange={handleChange}
                isValid={touched.until && !errors.until}
                isInvalid={errors.until}
                disabled={isPlaying || isSubmitting || submitCount > 0}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.until}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            {isSubmitting ? (
              <CenteredSpinner />
            ) : isPlaying ? (
              <CountdownCancel />
            ) : (
              submitCount < 1 && (
                <>
                  <SuccessButton title="Submit" errors={errors} />
                  {id && (
                    <NegativeButton title="Delete Holiday" holidayId={id} />
                  )}
                </>
              )
            )}
          </Form.Row>
          {status && <Status status={status} />}
        </Form>
      )}
    </Formik>
  );
};
export { RequestForm };
