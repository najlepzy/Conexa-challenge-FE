import React from "react";
import { FlatList, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { styles } from "./styles";
import type { FavoritesNavProp } from "./types";
import { EMPTY_POSTS } from "src/constants";
import { RootState } from "@store/index";
import { removeFavorite } from "@store/favorites";
import PostCard from "@components/Main/PostCard";

const Favorites: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<FavoritesNavProp>();
  const dispatch = useDispatch();

  const email = useSelector((s: RootState) => s.auth.email);
  const favs = useSelector((s: RootState) =>
    email ? s.favorites.itemsByUser[email] ?? EMPTY_POSTS : EMPTY_POSTS
  );

  if (favs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>{t("favorites.empty")}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favs}
      keyExtractor={(p) => p.id.toString()}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          isFavorite
          onPress={(id: number) =>
            navigation.navigate("Detail", { postId: id })
          }
          onToggleFavorite={() =>
            email && dispatch(removeFavorite({ email, postId: item.id }))
          }
        />
      )}
    />
  );
};

export default React.memo(Favorites);