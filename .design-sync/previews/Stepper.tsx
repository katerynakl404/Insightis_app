import * as React from 'react';
import { Stepper } from 'insightis-kit';

export function Start() {
  return <Stepper count={3} />;
}

export function InProgress() {
  return <Stepper count={4} active={2} />;
}

export function Complete() {
  return <Stepper count={3} active={3} />;
}
