import { useState, useEffect, useCallback, useRef } from "react";
import { Post } from "@store/api/interfaces";
import { PAGE_LIMIT, TOTAL_POSTS } from "@screens/Home/constants";
import { useGetPostsQuery } from "@store/api";

export function usePosts() {
  const fetchedPages = useRef<Set<number>>(new Set([1]));
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const reachedLimit = allPosts.length >= TOTAL_POSTS;

  const {
    data: pageData = [],
    isLoading,
    isFetching,
    error,
    isSuccess,
  } = useGetPostsQuery(
    { page, limit: PAGE_LIMIT },
    { skip: reachedLimit }
  );

  useEffect(() => {
    if (isSuccess && pageData.length) {
      setAllPosts((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const nuevos = pageData.filter((p) => !ids.has(p.id));
        return nuevos.length ? [...prev, ...nuevos] : prev;
      });
    }
  }, [pageData, isSuccess]);

  const loadMore = useCallback(() => {
    if (isFetching || reachedLimit) return;

    const nextPage = page + 1;
    if (fetchedPages.current.has(nextPage)) return;

    fetchedPages.current.add(nextPage);
    setPage(nextPage);
  }, [isFetching, page, reachedLimit]);

  return { allPosts, isLoading, isFetching, error, loadMore };
}