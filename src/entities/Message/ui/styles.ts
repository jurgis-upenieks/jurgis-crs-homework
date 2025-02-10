import styled from "styled-components";
import {rem, theme} from "@/shared";
import { ErrorExclamationIcon } from '@/shared/assets/svg';

export const NoFilterResultsSC = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: ${rem(16)};
`;

export const ErrorExclamationIconSC = styled(ErrorExclamationIcon)`
  color: ${theme.colors.accentSecondary};
  margin-top: ${rem(2)};
`;

export const MessageSC = styled.p`
  display: flex;
  align-items: center;
  font-size: ${rem(19)};
  color: ${theme.colors.blackRegularText};
  line-height: ${rem(29)};
`;