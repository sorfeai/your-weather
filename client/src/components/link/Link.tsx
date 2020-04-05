import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/vars';

type LinkProps = {
  href: string;
  children: JSX.Element | string;
} & { [key: string]: any };

const LinkStyled = styled.a`
  color: ${colors.primary};
`;

export function Link({ href, children, ...rest }: LinkProps) {
  return (
    <LinkStyled href={href} {...rest}>
      {children}
    </LinkStyled>
  );
}