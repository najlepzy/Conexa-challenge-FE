import { Post } from "@store/api/interfaces";

export interface PostsListProps {
  data: Post[];
  favs: Post[];
  onToggleFav: (post: Post, isFav: boolean) => void;
  onEndReached?: () => void;
  onPress: (id: number) => void;
  isFetching: boolean;
}
