"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";

export type NavLink = {
  pathname: string;
  name: string;
};

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
    <nav>
      <Ul>
        {navLinks.map((link: NavLink) => (
          <StyledLink
            key={link.pathname}
            href={link.pathname}
            $isActive={pathname === link.pathname}
          >
            {link.name}
          </StyledLink>
        ))}
      </Ul>
    </nav>
  );
}
