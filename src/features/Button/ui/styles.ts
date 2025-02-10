import styled from "styled-components";
import {rem, theme} from "@/shared";

export const ButtonSC = styled.button<{variant: 'primary' | 'secondary'}>`
  width: fit-content;
  border: ${rem(1)} solid ${theme.colors.accentPrimary};
  border-radius: ${rem(4)};
  background-color: ${({variant}) => variant === 'primary' ? theme.colors.accentPrimary : 'transparent'};
  padding: ${rem(3)} ${rem(10)};
  font-size: ${rem(16)};
  font-weight: 400;
  color: ${({variant}) => variant === 'primary' ? theme.colors.lightAlmostWhite : 'black'};
  
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  &,
  &:hover,
  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }
  
  &:hover {
    background-color: ${theme.colors.accentPrimaryActive};
    border-color: ${theme.colors.accentPrimaryActive};
  }
    
  &[disabled] {
    opacity: 0.3;
    pointer-events: none;
  }
  
  cursor: pointer;
`;