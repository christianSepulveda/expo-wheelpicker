import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoWheelpickerViewProps } from './ExpoWheelpicker.types';

const NativeView: React.ComponentType<ExpoWheelpickerViewProps> =
  requireNativeView('ExpoWheelpicker');

export default function ExpoWheelpickerView(props: ExpoWheelpickerViewProps) {
  return <NativeView {...props} />;
}
