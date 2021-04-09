import { useAuth } from 'hooks/useAuth';
import { isAdmin } from 'helpers';

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logOut } = useAuth();
  const showAdminBoard = user && isAdmin(user);

  const adminNavigation = (
    <Nav.Link as={Link} to="/admin">
      Admin Board
    </Nav.Link>
  );

  const leftNavigation = user && (
    <>
      {showAdminBoard && adminNavigation}
      <Nav.Link as={Link} to="/user">
        User
      </Nav.Link>
    </>
  );

  const auth = user && (
    <>
      <Nav.Link as={Link} to="/profile">
        {user.username}
      </Nav.Link>
      <Nav.Link onClick={logOut}>Log Out</Nav.Link>
    </>
  );

  const noAuth = (
    <>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
      <Nav.Link as={Link} to="/register">
        Sign Up
      </Nav.Link>
    </>
  );

  const rightNavigation = user ? auth : noAuth;

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Ridgewell House
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">{leftNavigation}</Nav>
        <Nav className="ml-auto">{rightNavigation}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export { Header };
