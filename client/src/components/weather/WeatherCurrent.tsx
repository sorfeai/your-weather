import React from 'react';
import styled, { keyframes } from 'styled-components';
import { sizes, colors, breakpoints } from '../../styles/vars';
import { getWeekAndMonthDay, formatTemp } from '../../utils';
import { WeatherState } from '../../types';

const weatherStateImages: {
  [key in WeatherState]: string;
} = {
  [WeatherState.Snow]: require('../../assets/images/weather-states/snow.png'),
  [WeatherState.Sleet]: require('../../assets/images/weather-states/clear.png'),
  [WeatherState.Hail]: require('../../assets/images/weather-states/hail.png'),
  [WeatherState.Thunderstorm]: require('../../assets/images/weather-states/clear.png'),
  [WeatherState.HeavyRain]: require('../../assets/images/weather-states/heavy-rain.png'),
  [WeatherState.LightRain]: require('../../assets/images/weather-states/light-rain.png'),
  [WeatherState.Showers]: require('../../assets/images/weather-states/showers.png'),
  [WeatherState.HeavyCloud]: require('../../assets/images/weather-states/heavy-cloud.png'),
  [WeatherState.LightCloud]: require('../../assets/images/weather-states/light-cloud.png'),
  [WeatherState.Clear]: require('../../assets/images/weather-states/clear.png'),
};

interface IWeatherCurrentProps {
  locationTitle: string;
  temp: number;
  minTemp: number;
  maxTemp: number;
  applicableDate: string;
  stateAbbr: WeatherState;
  stateName: string;
  stateIcon: string;
  windSpeed: number;
  windDirection: number;
  airPressure: number;
  humidity: number;
  visibility: number;
  predictability: number;
}

const appear = keyframes`
  from {
    background-size: 120%;
  }
  to {
    background-size: 140%;
  }
`;

const WeatherCurrentStyled = styled.div<{ backgroundImage: string }>`
  position: relative;
  display: flex;
  padding: 20px 25px;
  background-color: ${colors.primary};
  color: ${colors.fontAlt};
  border-radius: ${sizes.borderRadiusBig};
  overflow: hidden;

  ::before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    opacity: .4;
    display: block;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.backgroundImage});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 140% auto;
    animation: ${appear} 2.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
  
  @media (max-width: ${breakpoints.small}) {
    flex-direction: column;

    ::before {
      background-size: auto 100%;
      animation: none;
    }
  }
`;

const LeftCol = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid rgba(255,255,255,.4);
  flex-grow: 1;
  
  @media (max-width: ${breakpoints.small}) {
    justify-content: flex-start;
    margin-bottom: 30px;
    border: 0;
  }
`;

const RightCol = styled.div`
  position: relative;
  z-index: 2;
  width: 180px;
  margin-left: 15px;
  
  @media (max-width: ${breakpoints.small}) {
    margin-left: 0;
  }
`;

const Location = styled.h3`
  margin: 0 0 5px;
  font-weight: normal;
`;

const DateStyled = styled.h2`
  margin: 10px 0;
`;

const Weather = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Temperature = styled.div`
  font-size: 45px;
  font-weight: bold;
`;

const StateIcon = styled.div<{ src: string }>`
  width: 50px;
  height: 50px;
  margin-left: 8px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`; 

const StateName = styled.div`
  display: inline-block;
  padding: 3px 6px;
  margin-left: 10px;
  margin-top: 5px;
  background-color: white;
  color: ${colors.primary};
  border-radius: ${sizes.borderRadiusSmall};
  font-weight: bold;
`;

const MetaInfoItem = styled.div`
  margin-bottom: 5px;
`;

const WindDirection = styled.div<{ degree: number }>`
  display: inline-block;
  font-size: 16px;
  transform: rotate(${props => props.degree}deg);
`;

export function WeatherCurrent({ 
  locationTitle,
  applicableDate,
  temp,
  maxTemp,
  minTemp,
  stateIcon,
  stateName,
  windSpeed,
  windDirection,
  airPressure,
  stateAbbr,
}: IWeatherCurrentProps) {
  const weatherDate = React.useMemo(() => new Date(applicableDate), [applicableDate]);
  const { weekDay, monthDay } = getWeekAndMonthDay(weatherDate);
  
  const formattedTemp = React.useMemo(() => formatTemp(temp), [temp]);
  const formattedMaxTemp = React.useMemo(() => formatTemp(maxTemp), [temp]);
  const formattedMinTemp = React.useMemo(() => formatTemp(minTemp), [temp]);
  const formattedWindSpeed = React.useMemo(() => `${Math.round(windSpeed)}mph`, [windSpeed]);
  const formattedWindDirection = React.useMemo(() => Math.round(windDirection), [windDirection]);
  const formattedAirPressure = React.useMemo(() => `${Math.round(airPressure)}mb`, [airPressure]);

  const weatherStateImage = weatherStateImages[stateAbbr];

  return (
    <WeatherCurrentStyled backgroundImage={weatherStateImage}>
      <LeftCol>
        <div>
          <Location>Weather in <b>{locationTitle}</b></Location>
          <DateStyled>{`${weekDay}, ${monthDay}`}</DateStyled>
        </div>
        <div>
          <Weather>
            <Temperature>{formattedTemp}</Temperature>
            <StateIcon src={stateIcon} />
          </Weather>
          <StateName>{stateName}</StateName>
        </div>
      </LeftCol>
      <RightCol>
        <MetaInfoItem>
          <b>Max:</b> {formattedMaxTemp}
        </MetaInfoItem>
        <MetaInfoItem>
          <b>Min:</b> {formattedMinTemp}
        </MetaInfoItem>
        <MetaInfoItem>
          <b>Wind speed:</b> {formattedWindSpeed}
          &nbsp;
          <WindDirection degree={windDirection}>
            →
          </WindDirection>
        </MetaInfoItem>
        <MetaInfoItem>
          <b>Air pressure:</b> {formattedAirPressure}
        </MetaInfoItem>
      </RightCol>
    </WeatherCurrentStyled>
  )
}