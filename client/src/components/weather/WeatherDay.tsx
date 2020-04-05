import React from 'react';
import styled from 'styled-components';
import { sizes, colors, breakpoints } from '../../styles/vars';
import { formatTemp } from '../../utils';

interface IWeatherDayProps {
  id: string;
  selected: boolean;
  temp: number;
  applicableDate: string;
  stateIcon: string;
  onClick: (id: string) => void;
}

const WeatherDayStyled = styled.div<{ selected: boolean }>`
  width: 80px;
  height: 140px;
  padding: 10px;
  border-radius: ${sizes.borderRadiusSmall};
  box-shadow: ${props => props.selected ? '0px 5px 20px 0px rgba(0,0,0,0.25);' : 0};
  transition: box-shadow 100ms ease-out;
  cursor: pointer;
  user-select: none;

  :hover {
    background: ${props => props.selected ? 0 : colors.hover};
  }
  
  @media (max-width: 440px) {
    height: 75px;
  }
`; 

const DayName = styled.div<{ highlight: boolean }>`
  font-size: ${sizes.fontIncreased};
  color: ${props => props.highlight ? colors.fontEmphasis : 'inherit'};
  font-weight: bold;
`; 

const MonthDay = styled.div`
  color: ${colors.fontSecondary};
`; 

const StateIcon = styled.div<{ src: string }>`
  width: 40px;
  height: 40px;
  margin: 10px auto;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  
  @media (max-width: ${breakpoints.small}) {
    display: none;
  }
`; 

const Temperature = styled.div`
  color: ${colors.primary};
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

export function WeatherDay({ 
  id,
  selected,
  temp,
  applicableDate,
  stateIcon,
  onClick,
}: IWeatherDayProps) {
  const todayDate = React.useMemo(() => new Date(), [])
  const weatherDate = React.useMemo(() => new Date(applicableDate), [applicableDate]);
  const localeWeatherDate = weatherDate.toLocaleDateString('en', { weekday: 'short', month: 'long', day: 'numeric' });
  const [weekDay, monthDay] = localeWeatherDate.split(', ');

  const tempFormatted = formatTemp(temp);
  const isToday = todayDate.getDate() === weatherDate.getDate();
  const dayName = React.useMemo(() => isToday ? 'Today' : weekDay, [isToday])

  const handleClick = React.useCallback(() => {
    onClick(id);
  }, [onClick]);

  return (
    <WeatherDayStyled selected={selected} onClick={handleClick}>
      <DayName highlight={isToday}>
        {dayName}
      </DayName>
      <MonthDay>
        {monthDay}
      </MonthDay>
      <StateIcon src={stateIcon} />
      <Temperature>
        <div>{tempFormatted}</div>
      </Temperature>
    </WeatherDayStyled>
  );
}