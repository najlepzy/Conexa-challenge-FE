import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "src/navigation/types";

export type DetailsRouteProp = RouteProp<RootStackParamList, "Detail">;

export interface DetailsProps {
  route: DetailsRouteProp;
}