import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

const withNoSSR = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  return dynamic<P>(
    () => Promise.resolve(WrappedComponent),
    { ssr: false }
  );
};

export default withNoSSR;