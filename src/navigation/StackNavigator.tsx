import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import Logout from "@components/Auth/Logout";

import Details from "@screens/Details";
import TabNavigator from "./TabNavigator";
import type { RootStackParamList } from "./types";
import LanguageSwitcher from "@components/Header/LanguageSwitcher";

const Stack = createStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={({
          route,
        }: {
          route: RouteProp<RootStackParamList, "Main">;
        }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "News";
          return {
            title: t(`tabs.${routeName}`),
            headerLeft: () => <Logout />,
            headerRight: () => <LanguageSwitcher />,
          };
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Details}
        options={{
          title: t("detailTitle"),
          headerRight: () => <LanguageSwitcher />,
        }}
      />
    </Stack.Navigator>
  );
}