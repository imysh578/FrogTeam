import React from 'react';
import {FaBars,} from 'react-icons/fa';
import{Nav, NavbarContainer, NavBtnLink2, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink} from './NavbarElements';

const Navbar = ({ toggle }) => {
    return (
    <>
        <Nav>
            <NavbarContainer>
                <NavLogo to='/'> Frog </NavLogo>
                <MobileIcon onClick={toggle}>
                    <FaBars />
                </MobileIcon>
                <NavMenu>
                    <NavItem>
                        <NavLinks to = "about" smooth={true} duration={500} spy={true} exact='true' offset={-80}>About</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to = "discover" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Discover</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to = "chart" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Chart</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to = "news" smooth={true} duration={500} spy={true} exact='true' offset={-80}>News</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to = "signup" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Sign Up</NavLinks>
                    </NavItem>
                </NavMenu>
                <NavBtn>
                        <NavBtnLink to="/signin">Sign In/Up</NavBtnLink>OR
                        <NavBtnLink2 to="/">Sign Out</NavBtnLink2>
              </NavBtn>
            </NavbarContainer>
        </Nav>
    </>
    )
};

export default Navbar;