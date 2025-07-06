import { useNavigation } from "@react-navigation/native";
import { HomeNavProp } from "@screens/Home/types";

import { useSearch } from "../useSearch";
import { useFavorites } from "../useFavorites";
import { usePosts } from "@hooks/usePosts";

export function useHomeData() {
  const navigation = useNavigation<HomeNavProp>();
  const { allPosts, isLoading, isFetching, error, loadMore } = usePosts();
  const { filtered, term, setTerm } = useSearch(allPosts);
  const { favs, toggleFavorite } = useFavorites();

  const onPress = (postId: number) => navigation.navigate("Detail", { postId });

  return {
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
  };
}