import React, { useState, useEffect } from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Polygon from '../components/Polygon.png'
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [sticky, setSticky] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    });

    const handleScroll = () => {
        if (window.scrollY > 90) {
            setSticky(false);
        } else if (window.scrollY < 90) {
            setSticky(false);
        }
    }





    return (
        <div className={`header${sticky ? ' sticky' : ''}`}>
            <Navbar light expand="md">
                <Container>
                    <img src="https://i.imgur.com/GmEJyCo.png" alt="Logo" />
                    <NavbarBrand href="/" image src="https://i.imgur.com/GmEJyCo.png">Token NFT Gated Website</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="m-auto" navbar>
                            <NavItem>
                                <NavLink href="#">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Exclusive Content</NavLink>
                                

                                
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Private Marketplace</NavLink>
                                
                                
                            </NavItem>
                            <NavItem>
                                <NavLink href="./signin">GET ACCESS!</NavLink>
                                
                                
                            </NavItem>
                            
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
}




export default Header;