import {GrayCircleSC, GreenCircleSC, LoadingTextSC, SpinnerSectionSC, SpinnerSVGSC} from "./styles";
import {createPortal} from "react-dom";

export const Spinner = () =>
  createPortal(
    <SpinnerSectionSC>
      <SpinnerSVGSC viewBox="0 0 50 50">
        <GrayCircleSC cx="25" cy="25" r="20" fill="none" strokeWidth="7" />
        <GreenCircleSC cx="25" cy="25" r="20" fill="none" strokeWidth="7" />
      </SpinnerSVGSC>
      <LoadingTextSC>Loading...</LoadingTextSC>
    </SpinnerSectionSC>,
    document.getElementById('body') as HTMLElement
  );