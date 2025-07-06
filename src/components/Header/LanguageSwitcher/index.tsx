import React, { useState } from "react";
import { View, Modal, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import i18n from "@utils/translate/i18n";
import styles from "./styles";
import { LANGUAGE_OPTIONS, LanguageOption } from "./constants";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);

  const currentLang =
    (i18n.language.split("-")[0] as LanguageOption["code"]) || "en";

  const changeLang = (lng: LanguageOption["code"]) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <View>
      <TouchableOpacity
        testID="language-btn"
        onPress={() => setOpen(true)}
        style={styles.button}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="globe-outline" size={24} color="#007AFF" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{currentLang.toUpperCase()}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal transparent visible={open} animationType="fade">
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => setOpen(false)}
        />

        <View style={styles.modal}>
          {LANGUAGE_OPTIONS.map(({ code, label }) => (
            <TouchableOpacity
              key={code}
              onPress={() => changeLang(code)}
              style={styles.item}
            >
              <Text>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
}