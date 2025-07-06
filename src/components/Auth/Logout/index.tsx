import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import { logout } from "@store/auth";

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={() => dispatch(logout())} style={styles.button}>
      <Text style={styles.text}>{t("logout")}</Text>
    </TouchableOpacity>
  );
};

export default Logout;