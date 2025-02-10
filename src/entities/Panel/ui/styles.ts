import styled from "styled-components";
import {rem, theme} from "@/shared";

export const PanelSC = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: ${rem(4)}; 
  border: ${rem(1)} solid ${theme.colors.greyBorder};
  padding: ${rem(30)};
  gap: ${rem(20)};
`;
