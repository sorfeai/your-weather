import * as React from 'react';
import styled from 'styled-components';
import { colors, sizes } from '../../styles/vars';
import { Layout } from '../layout';
import { Weather } from '../weather';
import { GetWeatherButton } from '../button/GetWeatherButton';
import { getWeatherThunk } from '../../model/thunks';
import { getLoadingSelector, getErrorSelector, getWeatherSelector } from '../../model/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../actions';
import { AppError } from '../../model/types';
import { GeoLocationError, RequestError } from '../error';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${colors.backgronud};
  font-size: ${sizes.fontBasic};
  color: ${colors.fontPrimary};
`;

export function App() {
  const loading = useSelector(getLoadingSelector); 
  const error = useSelector(getErrorSelector); 
  const weather = useSelector(getWeatherSelector); 
  const isLoaded = weather !== null;

  const dispatch = useDispatch<AppDispatch>();

  const getWeather = React.useCallback(() => {
    dispatch(getWeatherThunk());
  }, [dispatch]);

  let content;
  if (error === AppError.GeoLocationError) {
    content = <GeoLocationError />;
  } else if (error === AppError.RequestError) {
    content = <RequestError />;
  } else if (!isLoaded || loading) {
    content = <GetWeatherButton isLoading={loading} onClick={getWeather} />;
  } else {
    content = <Weather />;
  }

  return (
    <AppContainer>
      <Layout>
        {content}
      </Layout>
    </AppContainer>
  );
}