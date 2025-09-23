import * as React from 'react';

import { ExpoWheelpickerViewProps } from './ExpoWheelpicker.types';

export default function ExpoWheelpickerView(props: ExpoWheelpickerViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
