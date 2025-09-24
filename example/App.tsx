import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import ExpoWheelpicker from "expo-wheelpicker";
import type { PickerItem } from "expo-wheelpicker";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PickerItem>();

  const changeModalState = () => setVisible(!visible);

  const onSelectItem = (item: PickerItem) => {
    setSelectedItem(item);
    changeModalState();
  };

  const options: PickerItem[] = [
    { isSelected: false, label: "Option 1", value: "option1" },
    { isSelected: false, label: "Option 2", value: "option2" },
    { isSelected: false, label: "Option 3", value: "option3" },
    { isSelected: false, label: "Option 4", value: "option4" },
    { isSelected: false, label: "Option 5", value: "option5" },
    { isSelected: false, label: "Option 6", value: "option6" },
    { isSelected: false, label: "Option 7", value: "option7" },
    { isSelected: false, label: "Option 8", value: "option8" },
    { isSelected: false, label: "Option 9", value: "option9" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expo WheelPicker Example</Text>

      <TouchableOpacity onPress={changeModalState} style={styles.button}>
        <Text style={styles.buttonLabel}>Show WheelPicker Modal</Text>
      </TouchableOpacity>

      <Text
        style={styles.selectedLabel}
      >{`Last Selected: ${selectedItem ? selectedItem.label : "Nothing :("}`}</Text>

      <ExpoWheelpicker
        items={options}
        visible={visible}
        visibleCount={5}
        setVisible={changeModalState}
        handleSelectItem={onSelectItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    marginTop: 70,
  },

  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#eee",
  },

  button: {
    padding: 14,
    borderRadius: 10,
    marginTop: "10%",
    backgroundColor: "purple",
  },

  buttonLabel: {
    fontWeight: "600",
    color: "white",
    fontSize: 16,
  },

  selectedLabel: { marginTop: 40, fontWeight: "500" },
});
