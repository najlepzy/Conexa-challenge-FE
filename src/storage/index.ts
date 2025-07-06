import AsyncStorage from "@react-native-async-storage/async-storage";
import pako from "pako";
import { toByteArray, fromByteArray } from "base64-js";
import { Post } from "@store/api/interfaces";

const FAVORITES_KEY = "favoritesByUser";

async function compressAndEncode(data: string): Promise<string> {
  const input = new TextEncoder().encode(data);
  const compressed = pako.deflate(input);
  return fromByteArray(compressed);
}

async function decodeAndDecompress(encoded: string): Promise<string> {
  const compressed = toByteArray(encoded);
  const decompressed = pako.inflate(compressed);
  return new TextDecoder().decode(decompressed);
}

export async function saveFavorites(
  itemsByUser: Record<string, Post[]>
): Promise<void> {
  const payload = JSON.stringify(itemsByUser);

  try {
    const encoded = await compressAndEncode(payload);
    await AsyncStorage.setItem(FAVORITES_KEY, encoded);
  } catch (error) {
    console.error("[Storage] Error saving compressed favorites:", error);
    throw error;
  }
}

export async function loadFavorites(): Promise<Record<string, Post[]>> {
  let stored: string | null;

  try {
    stored = await AsyncStorage.getItem(FAVORITES_KEY);
  } catch (error) {
    console.error("[Storage] Error reading favorites from storage:", error);
    return {};
  }

  if (!stored) {
    return {};
  }

  try {
    const json = await decodeAndDecompress(stored);
    return JSON.parse(json);
  } catch {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error("[Storage] Invalid favorites data format:", error);
      return {};
    }
  }
}