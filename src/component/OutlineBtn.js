import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import React from "react";
import { btnBlock } from "../styles/btnBlock";
import { global } from "../styles/global";
import Loading from "./Loading";
import { color } from "../styles/color";
import { outlineBtn } from "../styles/outlineBtn";

const OutlineBtn = ({ text, onPress, loading, style, disabled }) => {
  return (
    <TouchableOpacity
      style={[
        outlineBtn.container,
        global.dFlex,
        style,
        { opacity: loading || disabled ? 0.7 : 1 },
      ]}
      onPress={onPress}
      disabled={loading || disabled ? true : false}
    >
      {loading && (
        <Loading style={{ margin: 0, padding: 0 }} color={color.dark} />
      )}
      {!loading && <Text style={outlineBtn.text}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default OutlineBtn;
