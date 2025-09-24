import { Platform, StyleSheet } from "react-native";

export const ExpoWheelpickerStyles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    paddingRight: 30,
  },

  modal: {
    backgroundColor: "#000",
  },

  inputLabel: {
    fontWeight: "500",
    width: "100%",
    fontSize: 16,
  },

  flatList: {
    height: 50 * 2,
    backgroundColor: "transparent",
  },

  modalButton: { fontWeight: "500", marginTop: 15 },

  pickerContainer: {
    height: 250,
    justifyContent: "center",
    position: "relative",
  },

  pickerHighlightContainer: {
    position: "absolute",
    top: "40%",
    width: "100%",
    borderRadius: 8,
    zIndex: -1,
  },

  buttonGroup: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 100,
    marginTop: 40,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },

  sheet: {
    bottom: 0,
    position: "absolute",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: Platform.select({ ios: 12, android: 16 }),
    // sombra iOS
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -2 },
    // sombra Android
    elevation: 12,
  },

  // RENDER ITEM STYLES
  itemLabel: {
    width: 400,
    height: 45,
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: "center",
    paddingTop: 14,
  },

  itemContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  contentContainer: {
    alignItems: "center",
    paddingVertical: 100,
  },
});
