import classes from "./ArticleHeader.module.css";

import { Link } from "react-router-dom";
import SearchField from "./SearchField";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { apiLogOut } from "../../actions/api";
export default function ArticleHeader() {
  return (
    <Navbar className={classes.header} expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">React Articles</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/login" onClick={apiLogOut()}>
              LogOut
            </Link>
          </Nav>
          <Form className="d-flex">
            <SearchField label="Search" />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
