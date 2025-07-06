import { IMAGE_BASE_URL } from "@env";

export function useImageUrl(postId: number, width = 200, height = 200): string {
  const imageId = postId % 1000;
  return `${IMAGE_BASE_URL}/id/${imageId}/${width}/${height}`;
}
