import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const AppNavbar = () => {
  return (
    <div>
       <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book">Book Listner</Nav.Link>
            <Nav.Link href="/view/mybook">My Books</Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppNavbar
