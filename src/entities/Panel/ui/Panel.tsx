import {PanelSC} from "./styles";
import {HTMLAttributes, ReactNode} from "react";

type PanelProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const Panel = ({ children, ...otherProps }: PanelProps) =>
  <PanelSC {...otherProps}>
    {children}
  </PanelSC>;