import styled from "styled-components";
import {rem, theme} from "@/shared";
import Link from "next/link";

export const HeaderSC = styled.header`
  display: flex;
  flex: auto;
  flex-grow: 0;
  flex-direction: row;
  flex-wrap: nowrap; 
  align-items: center;
  height: 1.75rem;
  border-bottom: ${rem(1)} solid ${theme.colors.grey};
  padding: 0 1.25rem;
  gap: ${rem(40)};
    
  @media (min-width: ${rem(640)}) {
    height: 3.5rem;
  }
    
  background-color: ${theme.colors.greyBackground3};
`;

export const TitleSC = styled.h1`
  font-size: 0.875rem;
  font-weight: bold;

  @media (min-width: ${rem(640)}) {
    font-size: 1.25rem;
  }
`;

export const NavSC = styled.nav`
  display: flex;
  align-self: stretch;
  align-items: stretch;
`;

export const NavLinkSC = styled(Link)`
  display: flex;
  width: ${rem(200)};
  text-align: center;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.greyBoldText};
  &:hover,&.active {
    background-color: ${theme.colors.grey};
  }
  &.active {
    font-weight: bold;
    pointer-events: none;
  }
`;