import styled from "styled-components";
import { rem, theme } from "@/shared";
import { Message } from "@/entities";

export const TableWrapperSC = styled.section`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  align-items: center;
  gap: ${rem(20)};
`;

export const TableSC = styled.table`
  border-collapse: collapse;
  td, th {
    border: ${rem(1)} solid ${theme.colors.grey};
    padding: ${rem(4)} ${rem(8)};
    font-size: ${rem(14)};
    font-weight: 400;
  }
  th {
    font-size: ${rem(12)};
    font-weight: 600;
  }
  tr:nth-child(even) {
    background-color: ${theme.colors.grayBackground2};
  }
`;

export const TableHeadCellSC = styled.th`
  color: ${theme.colors.greyBoldText};
`;

export const TableHeadCellButtonSC = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${rem(12)};
  width: 100%;

  background: none;
  border: none;
  cursor: pointer;
`;

export const TableHeadCellTextSC = styled.span`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  text-align: center;
  font-weight: 600;
`;

export const DataCellSC = styled.td`
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
`;

export const NoResultsTableBodySC = styled.td`
  text-align: center;
`;

export const MessageSC = styled(Message)`
  margin: ${rem(31)};
`;

export const UnstyledTextInputSC = styled.input`
  width: 100%;
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
  outline: none;
  box-shadow: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`

export const ActionButtonsSC = styled.div`
  display: flex;
  justify-content: space-evenly;
`;