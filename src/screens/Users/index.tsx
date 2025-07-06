import React, { useCallback } from "react";
import {
  ActivityIndicator,
  Text,
  FlatList,
  type ListRenderItem,
} from "react-native";
import { LOADING_STYLE, ERROR_MESSAGE } from "./constants";
import withMemo from "@utils/reactMemo";
import { useGetUsersQuery, User } from "@store/api";
import UserCard from "@components/Main/UserCard";

const Users: React.FC = () => {
  const { data: users = [], isLoading, error } = useGetUsersQuery();

  const renderItem: ListRenderItem<User> = useCallback(
    ({ item }) => <UserCard user={item} />,
    []
  );

  if (isLoading) return <ActivityIndicator style={LOADING_STYLE} />;
  if (error) return <Text style={{ padding: 16 }}>{ERROR_MESSAGE}</Text>;

  return (
    <FlatList<User>
      testID="users-flatlist"
      data={users}
      renderItem={renderItem}
      keyExtractor={(u) => u.id.toString()}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={5}
      removeClippedSubviews
    />
  );
};

export default withMemo(Users);
