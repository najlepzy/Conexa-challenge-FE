import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image as RNImage,
} from 'react-native';
import { styles } from './styles';
import { ERROR_MESSAGE_DETAIL } from './constants';
import { DetailsProps } from './types';
import { useGetPostByIdQuery } from '@store/api';
import { useImageUrl } from '@hooks/useImageUrl';

const Details: React.FC<DetailsProps> = ({ route }) => {
  const { postId } = route.params;
  const { data: post, isLoading, error } = useGetPostByIdQuery(postId);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error || !post) {
    return <Text style={styles.error}>{ERROR_MESSAGE_DETAIL}</Text>;
  }

  const imageUri = useImageUrl(post.id, 400, 300);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <RNImage
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.title}>{post.title}</Text>
          <View style={styles.divider} />
          <Text style={styles.body}>{post.body}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;