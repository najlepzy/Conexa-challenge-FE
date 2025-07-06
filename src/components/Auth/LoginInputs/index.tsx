import React, { forwardRef } from "react";
import { TextInput, Text } from "react-native";
import { styles } from "./styles";
import { InputProps } from "./interfaces";


export const Input = forwardRef<TextInput, InputProps>(
  ({ error, style, ...props }, ref) => (
    <>
      <TextInput
        ref={ref}
        style={[styles.input, style, error && styles.errorBorder]}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  )
);