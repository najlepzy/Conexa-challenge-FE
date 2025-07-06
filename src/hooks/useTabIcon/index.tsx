import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { RootTabParamList } from "src/navigation/types";

type TabName = keyof RootTabParamList;

const ICONS: Record<TabName, [string, string]> = {
  News: ["newspaper-outline", "newspaper"],
  Users: ["people-outline", "people"],
  Favorites: ["star-outline", "star"],
};

export function useTabIcon(
  routeName: TabName,
  focused: boolean,
  size: number,
  color: string
) {
  const [outline, filled] = ICONS[routeName] ?? ICONS["News"];
  const iconName = focused ? filled : outline;
  return <Ionicons name={iconName as any} size={size} color={color} />;
}