import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import useHistory from 'react-router-dom';
import './Header.css';

const Header = () => {

  return (
    <Navbar className='custom-navbar' variant='dark' fixed='top'>
      <Container>
        <Nav className="me-auto">
          <Nav.Link className='link' href="/"> ColnJob </Nav.Link>
          <Nav.Link className='link' href="/EmailForm"> EmailPortal </Nav.Link>
          <Nav.Link className='link' href="/ExcelInsertion"> ImportExcel </Nav.Link>
          <Nav.Link className='link' href="/ExportExcel"> ExportExcel </Nav.Link>
        </Nav >
      </Container>
    </Navbar>
  );
}


export default Header;
