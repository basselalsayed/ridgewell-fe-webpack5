import { Form, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { getMin, getMax, plusTwoMonths, plusTwoDays } from 'helpers';
import { getHolidays } from 'store/modules';
import {
  CountdownCancel,
  NegativeButton,
  SuccessButton,
  Status,
  CenteredSpinner,
} from 'components';

import { today } from 'constants';
import { useCountdown } from 'hooks';

const RequestForm = ({ annualLeave, id, from, until, update }) => {
  const { isDelete, isPlaying } = useCountdown();
  const dispatch = useDispatch();

  const schema = yup.object({
    annualLeave: yup.boolean(),
    from: yup
      .date()
      .required('Required')
      .when('annualLeave', (annualLeave, schema) =>
        !update && annualLeave
          ? schema.min(
              plusTwoMonths(today),
              'Annual Leave must start two months in advance'
            )
          : schema.min(today, 'Date cannot be in the past')
      ),
    until: yup
      .date()
      .required('Required')
      .when('from', (from, schema) =>
        schema.min(from, 'Date cannot be behind start')
      )
      .when(['annualLeave', 'from'], (annualLeave, from, schema) =>
        !annualLeave
          ? schema.max(plusTwoDays(from), 'Maximum sick leave is two days')
          : schema
      ),
  });
  const ENDPOINT = update ? 'requests' : 'holidays';
  const updateData = { type: 'update', holidayId: id };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={async (data, { setStatus }) => {
        try {
          const response = isDelete
            ? await axios.post('requests', { holidayId: id, type: 'delete' })
            : await axios.post(
                ENDPOINT,
                update ? { ...data, ...updateData } : data
              );

          return response && (setStatus('Success'), dispatch(getHolidays()));
        } catch (err) {
          setStatus(`${err.response.statusText}: ${err.response.data.message}`);
        }
      }}
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
            ) : submitCount < 1 ? (
              <>
                <SuccessButton title="Submit" errors={errors} />
                {id && <NegativeButton title="Delete Holiday" holidayId={id} />}
              </>
            ) : null}
          </Form.Row>
          {status && <Status status={status} />}
        </Form>
      )}
    </Formik>
  );
};
export { RequestForm };
