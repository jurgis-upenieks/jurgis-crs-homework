import styled from "styled-components";
import {Panel} from "./../../Panel";
import {rem} from "@/shared";

export const PanelSC = styled(Panel)`
  align-self: flex-start;
  margin: ${rem(20)};
  max-width: ${rem(1280)};
`;
