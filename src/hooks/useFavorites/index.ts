import { useSelector, useDispatch } from "react-redux";
import { EMPTY_POSTS } from "../../constants";
import { addFavorite, removeFavorite } from "@store/favorites";
import { RootState } from "@store/index";
import { Post } from "@store/api/interfaces";

export function useFavorites() {
  const dispatch = useDispatch();
  const email = useSelector((s: RootState) => s.auth.email);
  const favs = useSelector((s: RootState) =>
    email ? s.favorites.itemsByUser[email] ?? EMPTY_POSTS : EMPTY_POSTS
  );

  const toggleFavorite = (post: Post, isFav: boolean) => {
    if (!email) return;
    dispatch(
      isFav
        ? removeFavorite({ email, postId: post.id })
        : addFavorite({ email, post })
    );
  };

  return { favs, toggleFavorite };
}