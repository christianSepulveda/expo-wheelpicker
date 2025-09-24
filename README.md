
# Expo WheelPicker

A bottom-sheet style wheel picker component for React Native and Expo.
It provides a scrollable “wheel” selector inside a modal that slides up from the bottom of the screen with a dark semi-transparent backdrop.

This is a JavaScript-only implementation. It runs in Expo Go without any native code or custom builds.
## Component API

#### PickerItem
Each item displayed in the wheel is defined by a `PickerItem`.  
This type lets you specify both the text shown in the picker and the associated value returned when the user makes a selection.

| Property     | Type     | Description                                                                 |
| :----------- | :------  | :-------------------------------------------------------------------------- |
| `label`      | `string` | Text shown to the user in the wheel.                                        |
| `value`      | `string` | Value associated with the item; returned by the selection callback.         |
| `isSelected` | `boolean` | Indicates whether this item is currently selected. Managed internally, but can be used for custom styling if needed. |

#### Example
```tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import WheelPicker, { PickerItem } from 'expo-wheelpicker';

export default function App() {
  // Type the items array with PickerItem[]
  const [items, setItems] = useState<PickerItem[]>([
    { label: 'Option 1', value: '1', isSelected: false },
    { label: 'Option 2', value: '2', isSelected: false },
    { label: 'Option 3', value: '3', isSelected: false },
  ]);

  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="Open Picker" onPress={() => setVisible(true)} />
      <WheelPicker
        visible={visible}
        items={items}
        setVisible={() => setVisible(false)}
        handleSelectItem={(item: PickerItem) => {
          console.log('Selected:', item.value);
        }}
      />
    </View>
  );
}
```

#### WheelPicker Parameters
| Parameter            | Type                         | Description                                                                 |
| :------------------- | :---------------------------- | :-------------------------------------------------------------------------- |
| `visible`            | `boolean`                     | **Required**. Controls the visibility of the modal.                         |
| `items`              | `PickerItem[]`                | **Required**. Array of picker items, each with a `label` and `value`.        |
| `setVisible`         | `() => void`                  | **Required**. Callback to hide the modal (e.g. `() => setVisible(false)`).   |
| `handleSelectItem`   | `(item: PickerItem) => void`  | **Required**. Callback fired when the user confirms the selected item.       |
| `initialIndex`       | `number`                      | Optional. Index of the item initially selected.                              |
| `title`              | `string`                      | Optional. Text displayed at the top of the modal.                            |
| `selectLabel`        | `string`                      | Optional. Text for the confirm/selection button.                             |
| `cancelLabel`        | `string`                      | Optional. Text for the cancel button.                                        |
| `selectButtonColor`  | `string`                      | Optional. Color of the confirm/selection button text.                        |
| `cancelButtonColor`  | `string`                      | Optional. Color of the cancel button text.                                   |
| `itemLabelColor`     | `string`                      | Optional. Color of the label text for each wheel item.                       |
| `highLightColor`     | `string`                      | Optional. Color of the highlight indicator showing the selected row.         |
| `visibleCount`       | `number`                      | Optional. Number of items visible in the wheel at one time.                  |
| `minScale`           | `number`                      | Optional. Minimum scale factor for non-selected items. Default: `0.75`.      |
| `minOpacity`         | `number`                      | Optional. Minimum opacity for non-selected items. Default: `0.35`.           |


## Interesting techniques

- Uses the built-in Modal component with animationType="slide" to create the bottom-sheet transition.
- Implements a wheel selector with a FlatList and snapToInterval for smooth snapping to each item.
- Applies flexible styling with StyleSheet and conditional padding to support both iOS and Android safe areas.
- These are all standard React Native APIs, making the component portable and easy to maintain.
## Project structure

```bash
.
├─ src/
│  ├─ ExpoPickerRenderItemView.tsx
│  ├─ ExpoWheelpickerStyles.ts
│  ├─ ExpoWheelpickerView.tsx
│  ├─ ExpoWheelpickerView.web.tsx
│  ├─ ExpoWheelpicker.types.ts
│  └─ index.ts
├─ example/               # Expo app demonstrating the component
├─ package.json
├─ tsconfig.json
└─ README.md
```