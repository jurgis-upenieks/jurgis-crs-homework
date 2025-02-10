import styled from "styled-components";
import {rem} from "@/shared";

export const ListContainerSC = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  ol {
    margin-bottom: ${rem(15)};
  }
  #text-item {
    display: flex;
    gap: ${rem(10)};
    margin-bottom: ${rem(5)};
  }
`;

export const ListItemSC = styled.li<{ indent: number }>`
  padding-left: ${(props) => rem(props.indent)};
  line-height: 1.5;
  margin-bottom: ${rem(12)};
`;