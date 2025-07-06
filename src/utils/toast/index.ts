import Toast from "react-native-toast-message";

export const showErrorToast = (title: string, message: string) => {
  Toast.show({
    type: "error",
    text1: title,
    text2: message,
    position: "top",
    topOffset: 50,
    props: {
      style: { width: "90%", alignSelf: "center" },
      contentContainerStyle: { paddingVertical: 16, paddingHorizontal: 20 },
      text1Style: { fontSize: 18, fontWeight: "bold" },
      text2Style: { fontSize: 14 },
    },
  });
};