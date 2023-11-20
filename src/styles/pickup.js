import { Dimensions, StyleSheet } from "react-native";
import { color } from "./color";
import { StatusBar } from "expo-status-bar";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export const pickup = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  mapSection: {
    width: "100%",
    height: "62%",
  },
  mapContainer: {
    flex: 1,
    overflow: "hidden",
  },
  map: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  content: {
    flex: 1,
  },
  row: {
    marginTop: 5,
    paddingHorizontal: width * 0.05,
  },
  label: {
    textTransform: "capitalize",
  },
  text: {
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: width * 0.046,
  },
  contentHeader: {
    backgroundColor: color.lighter,
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.03,
  },
  whatsappBtn: {
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  whatsappImg: {
    width: "100%",
    resizeMode: "contain",
  },
  modalContainer: {
    backgroundColor: color.white,
    flex: 1,
  },
});
