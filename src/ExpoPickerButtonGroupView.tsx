import { Text, TouchableOpacity, View } from "react-native";
import { ExpoWheelpickerStyles } from "./ExpoWheelpickerStyles";

type Props = {
  selectLabel?: string;
  cancelLabel?: string;
  selectButtonColor?: string;
  cancelButtonColor?: string;

  setVisible: () => void;
  setSelectedItem: () => void;
};

export default function ExpoPickerButtonGroupView(props: Props) {
  return (
    <View style={ExpoWheelpickerStyles.buttonGroup}>
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: props.selectButtonColor ?? "purple",
          padding: 14,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
        onPress={props.setSelectedItem}
        activeOpacity={0.8}
      >
        <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
          {props.selectLabel ?? "Select"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={props.setVisible}
        style={{ marginBottom: 40 }}
        activeOpacity={0.8}
      >
        <Text
          style={[
            ExpoWheelpickerStyles.inputLabel,
            {
              color: props.cancelButtonColor ?? "black",
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
            },
          ]}
        >
          {props.cancelLabel ?? "Cancel"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
