import {HTMLAttributes, ReactNode} from 'react';
import {ErrorExclamationIconSC, MessageSC, NoFilterResultsSC} from "./styles";
import {rem} from "@/shared";

type Props = {
  showIcon?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const Message = ({ children, showIcon = true, ...remainingProps }: Props) =>
  <NoFilterResultsSC {...remainingProps}>
    {showIcon && <ErrorExclamationIconSC size={rem(24)}/>}
    <MessageSC role="alert">
      {children}
    </MessageSC>
  </NoFilterResultsSC>;