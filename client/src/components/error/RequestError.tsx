import * as React from 'react';
import { AppError } from './AppError';

export function RequestError() {
  return (
    <AppError>
      Server error. Please try to reload the page.
    </AppError>
  );
}