import * as React from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../styles/vars';
import { Link } from '../link/Link';

const FooterStyled = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  
  @media (max-width: ${breakpoints.small}) {
    display: none;
  }
`;

const YandexLogo = styled.div`
  position: relative;
  top: -6px;
  width: 90px;
  height: 30px;
  background-image: url(${require('../../assets/images/yandex-money.png')});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

export function Footer() {
  return (
    <FooterStyled>
      Made specially for
      <YandexLogo />
      by&nbsp;
      <Link href="https://sorfeai.github.io/homepage/" target="_blank">Nikita Belousov</Link>
    </FooterStyled>
  );
}