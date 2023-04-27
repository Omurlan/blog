import React, { ComponentProps } from 'react';
import { Navbar } from 'components';

interface LayoutProps extends ComponentProps<'div'> {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 'var(--navbar-height)' }}>{children}</div>
    </>
  );
};

interface Props {}

export function withLayout<T extends Props>(Component: React.ComponentType<T>) {
  return (props: T) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
}
