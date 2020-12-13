import { Navbar, Nav } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { logOut } from 'Actions';
import { isAdmin } from 'Helpers';

const Header = () => {
  const { user } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const showAdminBoard = user && isAdmin(user);

  const adminNavigation = <Nav.Link href="/admin">Admin Board</Nav.Link>;

  const leftNavigation = user && (
    <>
      {showAdminBoard && adminNavigation}
      <Nav.Link href="/user">User</Nav.Link>
    </>
  );

  const auth = user && (
    <>
      <Nav.Link href="/profile">{user.username}</Nav.Link>
      <Nav.Link href="/login" onClick={() => dispatch(logOut())}>
        Log Out
      </Nav.Link>
    </>
  );

  const noAuth = (
    <>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Sign Up</Nav.Link>
    </>
  );

  const rightNavigation = user ? auth : noAuth;

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Ridgewell House</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">{leftNavigation}</Nav>
        <Nav className="ml-auto">{rightNavigation}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export { Header };
