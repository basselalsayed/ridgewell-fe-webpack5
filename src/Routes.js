import { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AdminRoute, PrivateRoute } from 'components';
import { App } from 'containers';
import UniversalContainer from 'containers/UniversalContainer';
import { asyncConnect } from 'redux-connect';
import { getAllHolidays } from 'store/modules';
import { isAdmin } from 'helpers';
import { useAuth } from 'hooks';

const Login = () => <UniversalContainer page="Login" />;
const HomeBase = (props) => <UniversalContainer page="Home" {...props} />;
const Register = () => <UniversalContainer page="Register" />;
const Profile = () => <UniversalContainer page="Profile" />;
const BoardUser = () => <UniversalContainer page="BoardUser" />;
const BoardAdmin = () => <UniversalContainer page="BoardAdmin" />;

const Home = asyncConnect([
  {
    promise: ({ store: { getState, dispatch } }) => {
      const promises = [];
      const state = getState();
      console.log('Hi');
      if (!state.content.holidays.loaded && !state.content.holidays.loaded) {
        console.log('asyncconnect was loaded');
        promises.push(dispatch(getAllHolidays()));
      }
      console.log('promises', promises);
      return Promise.all(promises);
    },
  },
])(HomeBase);

export const Routes = () => (
  <Switch>
    <PrivateRoute exact path={['/', '/home']} component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <PrivateRoute exact path="/profile" component={Profile} />
    <PrivateRoute path="/user" component={BoardUser} />
    <AdminRoute path="/admin" component={BoardAdmin} />
  </Switch>
);

export default (store) => {
  const isLoggedIn = () => !!store.getState().auth.user;

  const getUser = () => store.getState().auth.user;

  const authRender = (Component) => (props) =>
    isLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />;

  const adminRender = (Component) => (props) =>
    isLoggedIn() && isAdmin(getUser()) ? (
      <Component {...props} />
    ) : (
      <Redirect to="/home" />
    );

  return [
    {
      component: App,
      routes: [
        {
          path: ['/', '/home'],
          exact: true,
          // isPrivate: true,
          // render: (props) =>
          //   isLoggedIn ? <Home {...props} /> : <Redirect to="/login" />,
          render: authRender(Home),
        },
        {
          path: '/login',
          exact: true,
          component: Login,
        },
        {
          path: '/register',
          exact: true,
          component: Register,
        },
        {
          path: '/profile',
          exact: true,
          render: authRender(Profile),
        },
        {
          path: '/user',
          exact: true,
          render: authRender(BoardUser),
        },
        {
          path: '/admin',
          exact: true,
          render: adminRender(BoardAdmin),
        },
        {
          path: '/logout',
          exact: true,
          component: () => {
            useEffect(useAuth().logOut, []);
            return null;
          },
        },
      ],
    },
  ];
};
