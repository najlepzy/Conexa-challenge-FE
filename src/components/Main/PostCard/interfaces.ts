import { Post } from "@store/api/interfaces";

export interface PostCardProps {
  post: Post;
  onPress: (id: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (post: Post) => void;
}
