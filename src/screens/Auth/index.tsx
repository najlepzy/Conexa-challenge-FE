import React, { useRef, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { LoginProps } from "./types";
import styles from "./styles"; 
import { isValidLogin } from "@utils/login";
import { login } from "@store/auth";
import { showErrorToast } from "@utils/toast";
import LanguageSwitcher from "@components/Header/LanguageSwitcher";
import { Input } from "@components/Auth/LoginInputs";
import { Button } from "@components/Auth/LoginButton";


const Login: React.FC<LoginProps> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const passwordRef = useRef<TextInput>(null);

  const handleLogin = () => {
    if (isValidLogin(user, pass)) {
      dispatch(login(user));
    } else {
      showErrorToast(t("login.errorTitle"), t("login.errorMessage"));
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.switcher}>
        <LanguageSwitcher />
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>{t("login.title")}</Text>

          <Input
            placeholder={t("login.emailPlaceholder")}
            placeholderTextColor="#aaa"
            style={styles.input}
            value={user}
            onChangeText={setUser}
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
            autoComplete="email"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />

          <Input
            ref={passwordRef}
            placeholder={t("login.passwordPlaceholder")}
            placeholderTextColor="#aaa"
            style={styles.input}
            value={pass}
            onChangeText={setPass}
            secureTextEntry
            textContentType="password"
            autoComplete="password"
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />

          <Button title={t("login.button")} onPress={handleLogin} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;