"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styled, { css, useTheme } from "styled-components";
import { textBackground } from "@styles/animal-crossing/theme";
import { wiggleBox } from "@styles/animations";

const WIGGLE_BOX_DURATION_MS = 250; 

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
  list-style: none;
  justify-content: center;
  margin: 0 auto 1rem;
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

const WiggleBox = styled.div`
  border-width: 3px 4px 3px 5px;
  border: solid white;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;

  ${({ theme }) => theme.name !== "photography" && "display: none;"}
`;

const Box1 = styled(WiggleBox)`
  border-radius: 95px 14px 92px 15px / 14px 95px 16px 95px;
`;

const Box2 = styled(WiggleBox)`
  border-radius: 14px 92px 15px 95px / 95px 16px 95px 14px;
`;

const Box3 = styled(WiggleBox)`
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
`;
 
const Li = styled.li`
  position: relative;

  &:hover > ${Box1} {
    animation: ${WIGGLE_BOX_DURATION_MS}ms infinite ${wiggleBox};
  }

  &:hover > ${Box2} {
    animation: ${WIGGLE_BOX_DURATION_MS}ms infinite ${wiggleBox};
    animation-delay: ${WIGGLE_BOX_DURATION_MS / 3}ms;
  }

  &:hover > ${Box3} {
    animation: ${WIGGLE_BOX_DURATION_MS}ms infinite ${wiggleBox};
    animation-delay: ${2 * (WIGGLE_BOX_DURATION_MS / 3)}ms;
  }
`;

const StyledLink = styled(Link)<{ $isActive: boolean }>`
  display: block;
  padding: 1rem;
  position: relative;
  z-index: 2;
  
  ${({ $isActive }) => $isActive && `
    font-weight: bold;
    text-decoration: none;
  `}

  ${({ theme }) => theme.name === "animal-crossing" && `
      padding: 0 1rem;
    `}

  ${({ theme, $isActive }) => theme.name === "admin" && `
    color: limegreen;

    ${$isActive && "font-weight: normal;"}
  `}

  ${({ theme, $isActive }) => theme.name === "photography" && `
    font-size: 1.25rem;
    line-height: 1.5rem;
    ${$isActive && "font-weight: normal;"}
  `}
`;

 
export default function Navigation({ navLinks = defaultNavLinks, className = "" }) {
  const pathname = usePathname();
  
  const isActive = (name: string) => pathname.startsWith(`/${name.replaceAll(" ", "-")}`)
 
  return (
    <Nav className={className}>
      <Ul>
        {navLinks.map((link: NavLink) => (
          <Li key={link.pathname}>
            <Box1 />
            <Box2 />
            <Box3 />
            {link.image && <img src={link.image} alt="" />}
            <StyledLink
              href={link.pathname}
              $isActive={isActive(link.name)}
            >
              {link.name === "photography" && isActive("photography") && <>📷&nbsp;</>}
              {link.name}
            </StyledLink>
          </Li>
        ))}
        {process.env.NODE_ENV === "development" && (
          <Li>
            <Box1 />
            <Box2 />
            <Box3 />
            <StyledLink href="/admin" $isActive={isActive("admin")}>
              {isActive("admin") && <>&gt;&nbsp;</>}
              admin
            </StyledLink>
          </Li>
        )}
      </Ul>
    </Nav>
  );
}
