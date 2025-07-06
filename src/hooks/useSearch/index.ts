import { Post } from "@store/api/interfaces";
import { useMemo, useState } from "react";

export function useSearch(posts: Post[]) {
  const [term, setTerm] = useState("");
  const filtered = useMemo(() => {
    const q = term.toLowerCase().trim();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)
    );
  }, [posts, term]);
  return { filtered, term, setTerm };
}