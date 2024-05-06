"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styled, { css } from "styled-components";
import { textBackground } from "@styles/animal-crossing/theme";
import { Fragment } from "react";

export type NavLink = {
  pathname: string;
  name: string;
  image?: string;
};

const Nav = styled.nav`
  ${({ theme }) => theme.name === "animal-crossing" && css`
    ${textBackground};
    height: 4rem;
    padding: 1rem 2rem;
    text-align: center;
    width: 100%;
  `}
`;

const Ul = styled.ul`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)<{ $isActive: boolean }>`
  display: block;
  padding: 1rem;
  
  ${({ $isActive }) => $isActive && `
    font-weight: bold;
    text-decoration: none;
  `}

  ${({ theme }) => theme.name === "photography" && `
    &:hover {
      background-color: yellow;
      color: black;
    }
  `}

${({ theme }) => theme.name === "animal-crossing" && `
    padding: 0 1rem;
  `}
`;

const defaultNavLinks: NavLink[] = [
  {
    pathname: "/",
    name: "home",
  },
  {
    pathname: "/photography",
    name: "photography",
  },
  {
    pathname: "/animal-crossing",
    name: "animal crossing",
  }
]
 
export default function Navigation({ navLinks = defaultNavLinks }) {
  const pathname = usePathname();
 
  return (
    <Nav>
      <Ul>
        {navLinks.map((link: NavLink) => (
          <Fragment key={link.pathname}>
            {link.image && <img src={link.image} alt="" />}
            <StyledLink
              href={link.pathname}
              $isActive={pathname.includes(link.name.replaceAll(" ", "-"))}
            >
              {link.name}
            </StyledLink>
          </Fragment>
        ))}
        {process.env.NODE_ENV === "development" && (
          <StyledLink href="/admin" $isActive={pathname.includes("admin")}>
            admin
          </StyledLink>
        )}
      </Ul>
    </Nav>
  );
}
