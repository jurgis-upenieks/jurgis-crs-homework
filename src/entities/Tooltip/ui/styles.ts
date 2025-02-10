import styled from "styled-components";
import {rem, theme} from "@/shared";

export const TooltipBubbleSC = styled.div<{ bg?: string; multiline?: boolean }>`
  visibility: hidden;
  width: max-content;
  max-width: ${rem(200)};
  background-color: ${theme.colors.greyBoldText};
  color: white;
  text-align: center;
  border-radius: ${rem(4)};
  padding: ${rem(5)} ${rem(8)};
  position: absolute;
  z-index: 100;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  white-space: ${({ multiline }) => (multiline ? 'normal' : 'nowrap')};
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: ${rem(-5)};
    border-width: ${rem(5)};
    border-style: solid;
    border-color: ${theme.colors.greyBoldText} transparent transparent transparent;
  }
`;

export const TooltipWrapperSC = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover ${TooltipBubbleSC} {
    visibility: visible;
    opacity: 1;
  }
`;