import { Card, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { parseError } from 'helpers';
import {
  CenteredSpinner,
  CountdownCancel,
  Status,
  SuccessButton,
} from 'components';
// import { CenteredSpinner } from 'components/Spinner';
import { useAuth, useCountdown } from 'hooks';

const Register = ({ history }) => {
  const { isPlaying } = useCountdown();
  const { signUp } = useAuth();

  const schema = yup.object({
    username: yup
      .string()
      .required('Required')
      .trim()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username cannot be more than 20 characters'),
    email: yup
      .string()
      .required('Required')
      .email('This is not a valid email')
      .trim(),
    password: yup
      .string()
      .required('Required')
      .trim()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password cannot be more than 20 characters'),
    passwordConfirmation: yup
      .string()
      .required('Required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={async (
        { username, email, password },
        { setStatus, validateForm }
      ) => {
        validateForm();

        signUp({
          username: username.toLocaleLowerCase(),
          email: email.toLocaleLowerCase(),
          password,
        })
          .then(() => history.push('/profile'))
          .catch((error) => setStatus(parseError(error)));
      }}
      initialValues={{
        email: '',
        username: '',
        password: '',
        passwordConfirmation: '',
      }}
    >
      {({
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        status,
        touched,
      }) => (
        <div className="col-md-12">
          <Card className="card-container">
            <Card.Header>
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
              />
            </Card.Header>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Control
                  name="username"
                  type="text"
                  autoComplete="new_username"
                  placeholder="Enter username"
                  onChange={handleChange}
                  isValid={touched.username && !errors.username}
                  isInvalid={errors.username}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Control
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={errors.email}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Control
                  name="password"
                  type="password"
                  autoComplete="new_password"
                  placeholder="Password"
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={errors.password}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formPasswordConfirmation">
                <Form.Control
                  name="passwordConfirmation"
                  type="password"
                  autoComplete="new_password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  isValid={
                    touched.passwordConfirmation && !errors.passwordConfirmation
                  }
                  isInvalid={errors.passwordConfirmation}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.passwordConfirmation}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Row>
                {isSubmitting ? (
                  <CenteredSpinner />
                ) : isPlaying ? (
                  <CountdownCancel />
                ) : (
                  status !== 'Success' && (
                    <SuccessButton title="Submit" errors={errors} />
                  )
                )}
              </Form.Row>
              {status && <Status status={status} />}
            </Form>
          </Card>
        </div>
      )}
    </Formik>
  );
};

export { Register };
