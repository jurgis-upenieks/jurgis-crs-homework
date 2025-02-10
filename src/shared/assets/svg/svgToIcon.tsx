import React, { forwardRef, SVGProps } from 'react';
export interface SvgIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

export function svgToIcon(
  displayName: string,
  SvgComponent: React.FC<SVGProps<SVGSVGElement>>
) {
  const Icon = forwardRef<SVGSVGElement, SvgIconProps>(
    ({ size = 24, color = 'currentColor', style, ...props }, ref) => {
      return (
        <SvgComponent
          ref={ref}
          width={size}
          fill={color}
          preserveAspectRatio="xMidYMid meet"
          style={{
            verticalAlign: 'middle',
            ...style,
          }}
          {...props}
        />
      );
    }
  );

  Icon.displayName = displayName;
  return Icon;
}