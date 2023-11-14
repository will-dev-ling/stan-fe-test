import React from "react";
import styled from "styled-components";
import StanLogo from "./logo.svg";

// Styled components
const HeaderContainer = styled.header`
  background-color: #000;
  color: white;
  padding: 20px;
  text-align: center;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // padding: 0 10%;
`;

const BrandTitle = styled.img`
  max-width: 200px;
  padding-right: 48px;
`;

const NavbarLinks = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  align-items: flex-end;
`;

const NavbarLink = styled.li`
  padding: 0 16px;

  a {
    text-decoration: none;
    color: white;
    font-size: 24px;
    font-weight: 800;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Header component
const Header = () => {
  return (
    <HeaderContainer>
      <Navbar>
        <BrandTitle src={StanLogo} alt="Stan Logo" />
        <NavbarLinks>
          <NavbarLink>
            <a href="/">Home</a>
          </NavbarLink>
          <NavbarLink>
            <a href="/">TV Shows</a>
          </NavbarLink>
          <NavbarLink>
            <a href="/">Movies</a>
          </NavbarLink>
        </NavbarLinks>
      </Navbar>
    </HeaderContainer>
  );
};

export default Header;
