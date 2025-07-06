import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { ButtonProps } from "./interfaces";

export const Button: React.FC<ButtonProps> = ({ title, style, ...rest }) => (
  <TouchableOpacity style={[styles.btn, style]} {...rest}>
    <Text style={styles.txt}>{title}</Text>
  </TouchableOpacity>
);