import "@utils/translate/i18n";
import React, { useEffect, Suspense } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";

import { store, AppDispatch, RootState } from "./src/store";
import AppNavigator from "./src/navigation";
import Login from "./src/screens/Auth";
import { hydrateAuth } from "./src/store/auth";
import { hydrateFavorites } from "./src/store/favorites/thunks";

function AppContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, loaded } = useSelector((s: RootState) => s.auth);

  useEffect(() => {
    dispatch(hydrateAuth());
    dispatch(hydrateFavorites());
  }, [dispatch]);

  if (!loaded) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return isLoggedIn ? <AppNavigator /> : <Login />;
}

export default function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<ActivityIndicator style={{ flex: 1 }} />}>
        <NavigationContainer>
          <AppContent />
          <Toast />
        </NavigationContainer>
      </Suspense>
    </Provider>
  );
}
