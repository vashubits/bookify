import React from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const AppNavbar = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#00bcd4" : "#ffffff",
    fontWeight: location.pathname === path ? "600" : "500",
    marginLeft: "15px",
    transition: "all 0.3s",
  });

  return (
    <Navbar
      expand="md"
      style={{
        background: "linear-gradient(135deg, #0d1b2a, #1b263b)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
      }}
      variant="dark"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontWeight: "700",
            fontSize: "1.5rem",
            color: "#00bcd4",
            letterSpacing: "1px",
          }}
        >
          Bookify
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              style={linkStyle("/")}
              onMouseOver={(e) => (e.currentTarget.style.color = "#00e5ff")}
              onMouseOut={(e) =>
                (e.currentTarget.style.color =
                  location.pathname === "/" ? "#00bcd4" : "#ffffff")
              }
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/book"
              style={linkStyle("/book")}
              onMouseOver={(e) => (e.currentTarget.style.color = "#00e5ff")}
              onMouseOut={(e) =>
                (e.currentTarget.style.color =
                  location.pathname === "/book" ? "#00bcd4" : "#ffffff")
              }
            >
              Book Listner
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/view/mybook"
              style={linkStyle("/view/mybook")}
              onMouseOver={(e) => (e.currentTarget.style.color = "#00e5ff")}
              onMouseOut={(e) =>
                (e.currentTarget.style.color =
                  location.pathname === "/view/mybook"
                    ? "#00bcd4"
                    : "#ffffff")
              }
            >
              My Books
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/signout"
              style={linkStyle("/signout")}
              onMouseOver={(e) => (e.currentTarget.style.color = "#ff5252")}
              onMouseOut={(e) =>
                (e.currentTarget.style.color =
                  location.pathname === "/signout" ? "#00bcd4" : "#ffffff")
              }
            >
              Signout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
