import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/vars';

interface IAppErrorProps {
  children: JSX.Element | string; 
}

const ErrorStyled = styled.div`
  color: ${colors.fontError};
`;

export function AppError({ children }: IAppErrorProps) {
  return (
    <ErrorStyled>
      {children}
    </ErrorStyled>
  );
}