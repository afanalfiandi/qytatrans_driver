import { Dimensions, StyleSheet } from "react-native";
import { color } from "./color";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export const outlineBtn = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.white,
    borderWidth: 2,
    borderColor: color.primary,
    width: "100%",
    marginVertical: 5,
    paddingVertical: height * 0.0135,
    borderRadius: 6,
  },
  text: {
    color: color.primary,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
