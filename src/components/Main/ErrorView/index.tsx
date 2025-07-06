import React from "react";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import { ErrorViewProps } from "./interfaces";

const ErrorView: React.FC<ErrorViewProps> = ({ message }) => {
  const { t } = useTranslation();
  const text = message ?? t("home.loadError");
  return <Text style={styles.errorText}>{text}</Text>;
};

export default ErrorView;
