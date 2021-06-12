import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className="container mt-2">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand ><h3>Mobile House</h3></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Link className="nav-link mr-3" aria-current="page" to="/home">Home</Link>
                        <Link className="nav-link mr-3" aria-current="page" to="/orders">Order</Link>
                        <NavDropdown title="Admin" className="mr-3" >
                            <li><Link className="dropdown-item" to="/addProducts">Add Products</Link></li>
                            <li><Link className="dropdown-item" to="/manageProduct">Manage Products</Link></li>
                        </NavDropdown>
                        <Link className="nav-link mr-3" aria-current="page" to="/about">About</Link>
                        {
                            loggedInUser.name ? <p className="nav-link  text-warning font-weight-bold mb-0">{loggedInUser.name}</p> : <Link to="/login"><button type="button" className="btn btn-primary"> Login </button></Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>

    );
};

export default Header;
