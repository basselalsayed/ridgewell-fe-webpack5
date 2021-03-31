import { useAuth } from 'hooks/useAuth';
import { isAdmin } from 'helpers';

import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  const { user, logOut } = useAuth();
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
      <Nav.Link onClick={logOut}>Log Out</Nav.Link>
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
