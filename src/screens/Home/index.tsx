import React, { useMemo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { styles } from "./styles";
import { useHomeData } from "@hooks/useHomeData";
import {
  ErrorView,
  LoadingView,
  PostsList,
  SearchBar,
} from "@components/index";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const {
    filtered,
    term,
    setTerm,
    favs,
    toggleFavorite,
    isLoading,
    isFetching,
    error,
    loadMore,
    onPress,
  } = useHomeData();

  const searching = useMemo(() => term.trim().length > 0, [term]);

  if (isLoading) return <LoadingView />;
  if (error) return <ErrorView />;

  return (
    <View style={styles.container}>
      <SearchBar
        value={term}
        onChangeText={setTerm}
        placeholder={t("home.searchPlaceholder")}
      />

      <PostsList
        key={searching ? "searching-list" : "paged-list"}
        data={filtered}
        favs={favs}
        onToggleFav={toggleFavorite}
        onPress={onPress}
        onEndReached={searching ? undefined : loadMore}
        isFetching={!searching && isFetching}
      />
    </View>
  );
};

export default Home;