import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { PostCardProps } from "./interfaces";
import styles from "./styles";
import { useImageUrl } from "@hooks/useImageUrl";
import withMemo from "@utils/reactMemo";

const PostCard: React.FC<PostCardProps> = ({
  post,
  onPress,
  isFavorite,
  onToggleFavorite,
}) => {
  const imageUrl = useImageUrl(post.id);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID="favorite-button"
        onPress={() => onToggleFavorite(post)}
        style={styles.starWrapper}
      >
        <Ionicons
          name={isFavorite ? "star" : "star-outline"}
          size={20}
          color={isFavorite ? "#f1c40f" : "#555"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        testID="card-button"
        style={styles.card}
        onPress={() => onPress(post.id)}
      >
        <Image
          source={imageUrl}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.body}>
          <Text style={styles.title} numberOfLines={2}>
            {post.title}
          </Text>
          <Text style={styles.text} numberOfLines={3}>
            {post.body}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

PostCard.displayName = "PostCard";
export default withMemo(PostCard);