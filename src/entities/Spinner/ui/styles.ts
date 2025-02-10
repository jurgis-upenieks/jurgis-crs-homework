import styled, {keyframes} from "styled-components";
import {theme} from "@/shared";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

export const SpinnerSectionSC = styled.section`
  z-index: 50;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  animation: ${fadeIn} 0.3s ease-in-out forwards;
`;

export const SpinnerSVGSC = styled.svg`
  animation: ${rotate} 1.4s linear infinite;
  position: absolute;
  top: 40%;
  left: 50%;
  width: 3.5rem;
  height: 3.5rem;
  margin-top: -1.75rem;
  margin-left: -1.75rem;
`;

export const GrayCircleSC = styled.circle`
  stroke: ${theme.colors.greySpinner};
`;

export const GreenCircleSC = styled.circle`
  stroke: ${theme.colors.accent4};
  animation: ${dash} 1.4s ease-in-out infinite;
`;

export const LoadingTextSC = styled.span`
  position: absolute;
  top: 40%;
  margin-top: 2rem;
  margin-left: 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;
`;