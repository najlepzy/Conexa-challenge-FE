import React, { useCallback } from "react";
import { View, FlatList, type ListRenderItem } from "react-native";
import PostCard from "../PostCard";
import SkeletonPostCard from "../SkeletonPostCard";
import { styles } from "./styles";
import { Post } from "@store/api/interfaces";
import { FOOTER_SKELETON_COUNT } from "@screens/Home/constants";
import withMemo from "@utils/reactMemo";
import { PostsListProps } from "./interface";

const PostsList: React.FC<PostsListProps> = ({
  data,
  favs,
  onToggleFav,
  onEndReached,
  onPress,
  isFetching,
}) => {
  const renderItem: ListRenderItem<Post> = useCallback(
    ({ item }) => {
      const isFav = favs.some((f) => f.id === item.id);
      return (
        <PostCard
          post={item}
          isFavorite={isFav}
          onPress={() => onPress(item.id)}
          onToggleFavorite={() => onToggleFav(item, isFav)}
        />
      );
    },
    [favs, onPress, onToggleFav]
  );

  return (
    <FlatList<Post>
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={5}
      removeClippedSubviews
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReached ? 0.5 : undefined}
      ListFooterComponent={
        isFetching ? (
          <View style={styles.skeletonFooterContainer}>
            {Array.from({ length: FOOTER_SKELETON_COUNT }).map((_, i) => (
              <SkeletonPostCard key={i} />
            ))}
          </View>
        ) : null
      }
    />
  );
};

export default withMemo(PostsList);