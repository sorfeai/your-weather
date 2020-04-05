import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { getWeatherIconURL } from '../../meta';
import { WeatherState } from '../../types';
import { colors, sizes } from '../../styles/vars';

interface IGetWeatherButtonProps {
  loading: boolean;
  onClick: () => void;
}

const ButtonStyled = styled.button<{ loading: boolean }>`
  display: flex;
  width: 230px;
  height: 60px;
  align-items: center;
  padding: 10px 18px;
  justify-content: space-between;
  background: ${colors.primary};
  color: ${colors.fontAlt};
  border: 0;
  outline: 0;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: bold;
  border-radius: 50vh;
  overflow: hidden;
  transition: transform 200ms ease-out,
              box-shadow 200ms ease-out;

  ${({ loading }) => !loading && `
    cursor: pointer;
  `}

  &:hover {
    ${({ loading }) => !loading && `
      transform: scale(1.06);
      box-shadow: 0px 3px 20px 0px rgba(68,139,229,1);
    `}
  }
`;

const ButtonIcon = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
  margin-left: 24px;
  background-image: url(${getWeatherIconURL(WeatherState.LightCloud)});
  background-repeat: no-repeat;
  background: position: center;
  background-size: contain;
  transform: scale(2.5);
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled.div`
  display: inline-block;
  width: 42px;
  height: 42px;
  margin: auto;
  background-image: url(${require('../../assets/images/clear-icon-white.svg')});
  background-repeat: no-repeat;
  background: position: center;
  background-size: contain;
  animation: ${rotate} 2s linear infinite;
`;

export function GetWeatherButton({ loading, onClick }: IGetWeatherButtonProps) {
  return (
    <ButtonStyled loading={loading} onClick={onClick}>
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          Get Weather
          <ButtonIcon />
        </>
      )}
    </ButtonStyled>
  );
} 