import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, RootTabParamList } from "../../navigation/types";

export type FavoritesNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, "Favorites">,
  StackNavigationProp<RootStackParamList>
>;