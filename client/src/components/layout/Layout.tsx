import * as React from 'react';
import styled from 'styled-components';
import { Footer } from '../footer/Footer';

interface ILayoutProps {
  children: JSX.Element | string;
}

const LayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 600px;
  min-width: 380px;
  padding: 25px 20px 10px;
  margin: 0 auto;
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export function Layout({ children }: ILayoutProps) {
  return (
    <LayoutStyled>
      <Content>
        {children}
      </Content>
      <Footer />
    </LayoutStyled>
  );
}