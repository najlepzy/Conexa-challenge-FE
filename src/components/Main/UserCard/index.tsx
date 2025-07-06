import React from "react";
import { View, Text } from "react-native";
import { UserCardProps } from "./types";
import styles from "./styles";
import withMemo from "@utils/reactMemo";


const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{user.name}</Text>
    <Text>{user.email}</Text>
    <Text>{user.phone}</Text>
  </View>
);

export default withMemo(UserCard);