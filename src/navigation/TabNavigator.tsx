import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";

import type { RootTabParamList } from "./types";

import { Home, Users, Favorites } from "@screens/index";
import { useTabIcon } from "@hooks/useTabIcon";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) =>
          useTabIcon(route.name, focused, size, color),
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#888",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="News"
        component={Home}
        options={{ title: t("tabs.News") }}
      />
      <Tab.Screen
        name="Users"
        component={Users}
        options={{ title: t("tabs.Users") }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{ title: t("tabs.Favorites") }}
      />
    </Tab.Navigator>
  );
}