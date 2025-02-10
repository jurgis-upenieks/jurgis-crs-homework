import styled from "styled-components";
import {rem, theme} from "@/shared";

export const SearchTextInputSC = styled.section`
  position: relative;
`;

export const InputSC = styled.input`
  border-radius: ${rem(4)};
  height: ${rem(18)};
  min-height: ${rem(18)};
  box-sizing: border-box;
  border: ${rem(1)} solid ${theme.colors.greyBorder};
  width: 100%;
  padding-left: ${rem(30)};
  min-width: ${rem(75)};
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const IconWrapperSC = styled.span`
  position: absolute;
  left: ${rem(5)};
  top: 0;
`;