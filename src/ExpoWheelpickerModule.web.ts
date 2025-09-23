import { registerWebModule, NativeModule } from 'expo';

import { ExpoWheelpickerModuleEvents } from './ExpoWheelpicker.types';

class ExpoWheelpickerModule extends NativeModule<ExpoWheelpickerModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoWheelpickerModule, 'ExpoWheelpickerModule');
