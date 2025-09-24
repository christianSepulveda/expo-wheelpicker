
# Expo WheelPicker

A bottom-sheet style wheel picker component for React Native and Expo.
It provides a scrollable “wheel” selector inside a modal that slides up from the bottom of the screen with a dark semi-transparent backdrop.

This is a JavaScript-only implementation. It runs in Expo Go without any native code or custom builds.
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