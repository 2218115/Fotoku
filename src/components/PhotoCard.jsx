import React from 'react';
import {
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import Octicons from '@react-native-vector-icons/octicons';
import colors from '../assets/colors';

export function PhotoCard({item, onPressOption}) {
  const [liked, setLiked] = React.useState(false);

  return (
    <View style={card.wrapper}>
      <TouchableWithoutFeedback
        onPress={() => {
          setLiked(!liked);
        }}>
        <View style={card.container}>
          <Image src={item.image} style={card.image} />
          <View style={card.content}>
            <View style={card.authorContainer}>
              <Image src={item.author.image} style={card.authorImage} />
              <Text style={card.authorName}>{item.author.name}</Text>
            </View>

            <View style={card.actionContainer}>
              <Octicons
                name="heart"
                color={liked ? colors.primary : colors.primaryLight}
                size={16}
              />
              <Octicons name="share" color={colors.primary} size={16} />
              
              <Octicons name="kebab-horizontal" color={colors.primary} size={16} onPress={onPressOption} />
            </View>
          </View>
          <Text style={card.caption}>{item.caption}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const card = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  content: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 24,
    height: 24,
    borderRadius: 32,
  },
  authorName: {
    marginLeft: 8,
    fontSize: 12,
    color: colors.secondary,
  },
  caption: {
    marginTop: 4,
    fontSize: 14,
    color: colors.primary,
  },
  actionContainer: {
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 8,
  },
});
