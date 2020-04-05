import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getLocationSelector,
  getWeatherSelector,
  getSelectedDaySelector,
  getSelectedDayWeatherSelector,
} from '../../model/selectors';
import { getWeatherThunk } from '../../model/thunks';
import { SelectDay } from '../../model/actions';
import { AppDispatch } from '../../actions';
import { WeatherDay } from './WeatherDay';
import { WeatherCurrent } from './WeatherCurrent';
import { sizes, breakpoints } from '../../styles/vars';

const Wrapper = styled.div`
  width: 100%;
`;

const currentApear = keyframes`
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const WeatherCurrentWrapper = styled.div`
  margin-bottom: 20px;
  animation: ${currentApear} 1.2s cubic-bezier(0.22, 1, 0.36, 1);
`;

const Heading = styled.h2`
  margin: 0;
  margin-bottom: 15px;
`;

const daysAppear = keyframes`
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const WeatherDays = styled.div`
  width: 100%;
  padding: 20px 25px;
  background: white;
  border-radius: ${sizes.borderRadiusBig};
  animation: ${daysAppear} 1.2s cubic-bezier(0.22, 1, 0.36, 1);
`;

const WeatherDaysList = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  
  @media (max-width: ${breakpoints.medium}) {
    justify-content: flex-start;
  }
`;

export function WeatherData() {
  const location = useSelector(getLocationSelector); 
  const weather = useSelector(getWeatherSelector); 
  const selectedDay = useSelector(getSelectedDaySelector); 
  const selectedDayWeather = useSelector(getSelectedDayWeatherSelector);

  const dispatch = useDispatch<AppDispatch>();

  const selectDay = React.useCallback((id: string) => {
    dispatch(new SelectDay(id));
  }, [dispatch]);

  return (
    <Wrapper>
      <>
        <WeatherCurrentWrapper>
          <WeatherCurrent
            locationTitle={location!.title}
            temp={selectedDayWeather!.the_temp}
            minTemp={selectedDayWeather!.min_temp}
            maxTemp={selectedDayWeather!.max_temp}
            applicableDate={selectedDayWeather!.applicable_date}
            stateAbbr={selectedDayWeather!.weather_state_abbr}
            stateName={selectedDayWeather!.weather_state_name}
            stateIcon={selectedDayWeather!.weather_state_icon_url}
            windSpeed={selectedDayWeather!.wind_speed}
            windDirection={selectedDayWeather!.wind_direction}
            airPressure={selectedDayWeather!.air_pressure}
            humidity={selectedDayWeather!.humidity}
            visibility={selectedDayWeather!.visibility}
            predictability={selectedDayWeather!.predictability}
          />
        </WeatherCurrentWrapper>
        <WeatherDays>
          <Heading>{`Forecast for ${weather!.length} days`}</Heading>
          <WeatherDaysList>
            {weather!.map(day => (
              <WeatherDay
                id={day.id}
                selected={day.id === selectedDay}
                temp={day.the_temp}
                applicableDate={day.applicable_date}
                stateIcon={day.weather_state_icon_url}
                onClick={selectDay}
              />
            ))}
          </WeatherDaysList>
        </WeatherDays>
      </>
    </Wrapper>
  ); 
}

const LoadingStyled = styled.div``;

function Loading() {
  return (
    <LoadingStyled>
      Loading...
    </LoadingStyled>
  );
}