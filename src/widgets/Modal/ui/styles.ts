import styled from "styled-components";
import {CloseIcon} from "@/shared/assets/svg";
import {rem, theme} from "@/shared";

export const ModalSC = styled.dialog`
  z-index: 0;
  background-color: ${theme.colors.lightAlmostWhite};
  overflow: hidden;
  border: none;
  border-radius: ${rem(8)};
  width: 100%;
  max-width: ${rem(500)};
  margin: auto;
  padding: 0;
`;

export const FormSC = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1.5rem 2rem;
`;

export const HeaderSC = styled.section`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  flex-grow: 0;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const TitleSC = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
`;

export const CloseButtonSC = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const CloseIconSC = styled(CloseIcon)`
  stroke: ${theme.colors.blackRegularText};
`

export const ContentSC = styled.section`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  color: ${theme.colors.blackRegularText};
`;

export const ButtonsSC = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  height: 100%;
  gap: ${rem(22)};
  margin-top: ${rem(25)};
  margin-right: ${rem(8)};
`;
