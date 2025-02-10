import {IconWrapperSC, InputSC, SearchTextInputSC} from "./styles";
import {ElementType} from "react";

type Props = {
  value: string;
  onChange?: (value: string) => void;
  iconComponent?: ElementType;
};

export const SearchTextInput = ({ value, onChange: handleChange, iconComponent: IconComponent }: Props) =>
  <SearchTextInputSC>
    <InputSC
      type='text'
      value={value}
      onChange={(event) => handleChange?.(event?.target?.value)}
    />
    {IconComponent && <IconWrapperSC><IconComponent color='transparent'/></IconWrapperSC>}
  </SearchTextInputSC>;