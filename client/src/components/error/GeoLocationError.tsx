import * as React from 'react';
import { AppError } from './AppError';

export function GeoLocationError() {
  return (
    <AppError>
      Please allow geolocation detection in your browser then reload the page.
    </AppError>
  );
}