import axios from "axios";
import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { FaBars } from "react-icons/fa";
import {
  Nav,
  NavbarContainer,
  NavBtnLink2,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = ({ toggle }) => {
  const { data, loading, error } = useAxios({
    method: "get",
    baseURL: "http://localhost:5000",
    url: "auth/session",
  });
  console.log(data);

  const signoutHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("된다");
      await axios.get("http://localhost:5000/auth/logout");
      window.location.replace("/");
    } catch {
      console.log("로그아웃 오류");
    }
  };

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/"> Frog </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks
                to="about"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                About
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="discover"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                Discover
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="chart"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                Chart
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="news"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                News
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="signup"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                MyPage
              </NavLinks>
            </NavItem>
          </NavMenu>
          <NavBtn>
            {data ? (
              <NavBtnLink2 to="/" onClick={signoutHandler}>
                Sign Out
              </NavBtnLink2>
            ) : (
              <NavBtnLink to="/signin">Sign In/Up</NavBtnLink>
            )}
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
