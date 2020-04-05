import * as React from 'react';
import styled from 'styled-components';
import { colors, sizes } from '../../styles/vars';
import { Layout } from '../layout';
import { Weather } from '../weather';
import { GetWeatherButton } from '../button/GetWeatherButton';
import { getWeatherThunk } from '../../model/thunks';
import { getRequestStatusSelector } from '../../model/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../actions';
import { RequestStatus } from '../../types';

const AppStyled = styled.div`
  min-height: 100vh;
  background-color: ${colors.backgronud};
  font-size: ${sizes.fontBasic};
  color: ${colors.fontPrimary};
`;

export function App() {
  const weatherRequestStatus = useSelector(getRequestStatusSelector); 

  const dispatch = useDispatch<AppDispatch>();

  const getWeather = React.useCallback(() => {
    dispatch(getWeatherThunk());
  }, [dispatch]);

  return (
    <AppStyled>
      <Layout>
        {weatherRequestStatus === null || weatherRequestStatus === RequestStatus.pending ? (
          <GetWeatherButton 
            loading={weatherRequestStatus === RequestStatus.pending}
            onClick={getWeather} />
        ) : weatherRequestStatus === RequestStatus.error ? (
          <div>Error</div>
        ) : <Weather />}
      </Layout>
    </AppStyled>
  );
}