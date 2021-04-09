import React from 'react';
// import _extends from '@babel/runtime/helpers/esm/extends';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from 'components';
import { App } from 'containers';
// import UniversalComponent from 'components/UniversalComponent';
import UniversalContainer from 'containers/UniversalContainer';
import { asyncConnect } from 'redux-connect';
import { getHolidays } from 'store/modules';

// export const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
//   routes &&
//   React.createElement(
//     Switch,
//     switchProps,
//     routes.map((route, i) =>
//       route.isPrivate
//         ? React.createElement(PrivateRoute, {
//             key: route.key || i,
//             path: route.path,
//             exact: route.exact,
//             strict: route.strict,
//             component: route.component,
//           })
//         : React.createElement(Route, {
//             key: route.key || i,
//             path: route.path,
//             exact: route.exact,
//             strict: route.strict,
//             render: (props) =>
//               route.render
//                 ? route.render(
//                     _extends({}, props, {}, extraProps, {
//                       route,
//                     })
//                   )
//                 : React.createElement(
//                     route.component,
//                     _extends({}, props, extraProps, {
//                       route,
//                     })
//                   ),
//           })
//     )
//   );

const Login = () => <UniversalContainer name="Login" />;
const HomeBase = (props) => <UniversalContainer name="Home" {...props} />;
const Register = () => <UniversalContainer name="Register" />;
const Profile = () => <UniversalContainer name="Profile" />;
const BoardUser = () => <UniversalContainer name="BoardUser" />;
const BoardAdmin = () => <UniversalContainer name="BoardAdmin" />;

const Home = asyncConnect([
  {
    promise: ({ store: { getState, dispatch } }) => {
      const promises = [];
      const state = getState();
      console.log('Hi');
      if (!state.content.holidays.loaded && !state.content.holidays.loaded) {
        console.log('asyncconnect was loaded');
        promises.push(dispatch(getHolidays()));
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
    <PrivateRoute path="/admin" component={BoardAdmin} />
  </Switch>
);

export default (store) => {
  const isLoggedIn = () => !!store.getState().auth.user;

  const authRender = (Component) => (props) =>
    isLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />;

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
          render: authRender(BoardAdmin),
        },
      ],
    },
  ];
};
