import { NativeModule, requireNativeModule } from 'expo';

import { ExpoWheelpickerModuleEvents } from './ExpoWheelpicker.types';

declare class ExpoWheelpickerModule extends NativeModule<ExpoWheelpickerModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoWheelpickerModule>('ExpoWheelpicker');
