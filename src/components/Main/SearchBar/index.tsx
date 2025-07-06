import React from "react";
import {
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SearchBarProps } from "./types";
import styles from "./styles";

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder,
}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container} testID="searchbar-container">
      <TextInput
        style={styles.input}
        placeholder={placeholder || "Buscar..."}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
      />
    </View>
  </TouchableWithoutFeedback>
);

export default SearchBar;
