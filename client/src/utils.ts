export function getWeekAndMonthDay(date: Date, weekdayLong = true): {
  weekDay: string;
  monthDay: string;
} {
  const localeWeatherDate = date.toLocaleDateString('en', 
    { weekday: weekdayLong ? 'long' : 'short', month: 'long', day: 'numeric' }
  );
  const [weekDay, monthDay] = localeWeatherDate.split(', ');

  return {
    weekDay: weekDay,
    monthDay: monthDay,
  };
}

export function formatTemp(temp: number): string {
  const value = Math.round(temp).toString();
  if (value[0] !== '-' && value !== '0') {
    return `+${value}°`;
  }
  return value;
}