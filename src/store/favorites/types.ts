import { Post } from "@store/api/interfaces";

export interface FavoritesState {
  itemsByUser: Record<string, Post[]>;
  loaded: boolean;
  error: string | null;
}

export interface AddFavoritePayload {
  email: string;
  post: Post;
}

export interface RemoveFavoritePayload {
  email: string;
  postId: number;
}