import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Octicons from '@react-native-vector-icons/octicons';

const data = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b',
    caption: 'Mystical morning fog in the forest',
    author: {
      name: 'Lukasz Szmigiel',
      profileImage:
        'https://images.unsplash.com/profile-1670448487744-0da0d16b8ae1image?w=150&dpr=1&crop=faces&bg=%23fff&h=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f',
    caption: 'Sun rays piercing through tall trees',
    author: {
      name: 'Thomas Tucker',
      profileImage:
        'https://images.unsplash.com/profile-1670448487744-0da0d16b8ae1image?w=150&dpr=1&crop=faces&bg=%23fff&h=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1503435980610-a51f3ddfee50',
    caption: 'Autumn colors in the peaceful woods',
    author: {
      name: 'Tim Swaan',
      profileImage:
        'https://images.unsplash.com/profile-1670448487744-0da0d16b8ae1image?w=150&dpr=1&crop=faces&bg=%23fff&h=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1',
    caption: 'Dense green forest with sunlight filtering through',
    author: {
      name: 'Jorge Zapata',
      profileImage:
        'https://images.unsplash.com/profile-1670448487744-0da0d16b8ae1image?w=150&dpr=1&crop=faces&bg=%23fff&h=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1465188162913-8fb5709d6d57',
    caption: 'Forest reflected in a calm lake',
    author: {
      name: 'Francesco Ungaro',
      profileImage:
        'https://images.unsplash.com/profile-1670448487744-0da0d16b8ae1image?w=150&dpr=1&crop=faces&bg=%23fff&h=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1470114716159-e389f8712fda',
    caption: 'Snow-covered pine trees in winter forest',
    author: {
      name: 'Simon Matzinger',
      profileImage:
        'https://images.unsplash.com/profile-1670448487744-0da0d16b8ae1image?w=150&dpr=1&crop=faces&bg=%23fff&h=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d',
    caption: 'Lush green rainforest with hanging vines',
    author: {
      name: 'Sebastian Unrau',
      profileImage: 'https://unsplash.com/@sebastian_unrau',
    },
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTopContainer}>
          <Text style={styles.headerTitle}>Fotoku</Text>
          <View style={styles.headerActionContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.headerActionButton}>
                <Octicons name="diff-added" color={colors.primary} size={32} />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.headerActionButton}>
                <Octicons name="person" color={colors.primary} size={32} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View>
          <View
            style={{
              marginTop: 16,
              paddingVertical: 2,
              paddingHorizontal: 8,
              backgroundColor: colors.primaryLight,
              borderRadius: 8,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              style={{flex: 1, color: colors.primary}}
              selectionColor={colors.secondary}
              cursorColor={colors.primary}
              placeholderTextColor={colors.secondary}
              placeholder="Cari Inspirasi Potret"
            />
            <Octicons
              name="search"
              color={colors.secondary}
              size={16}
              style={{marginRight: 8}}
            />
          </View>
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={card.wrapper}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={card.container}>
                <Image src={item.image} style={card.image} />
                <View style={card.content}>
                  <View style={card.authorContainer}>
                    <Image
                      src={item.author.profileImage}
                      style={card.authorImage}
                    />
                    <Text style={card.authorName}>{item.author.name}</Text>
                  </View>

                  <View style={card.actionContainer}>
                    <Octicons name="heart" color={colors.primary} size={16} />
                    <Octicons name="share" color={colors.primary} size={16} />
                  </View>
                </View>
                <Text style={card.caption}>{item.caption}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      />
    </View>
  );
}

const colors = {
  primary: '#111111',
  primaryLight: '#f1f1f1',
  secondary: '#6f6f6f',
  accent: '#007AFF',
  border: '#f5f5f5',
  background: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },

  headerContainer: {
    padding: 16,
    borderBottomColor: colors.primaryLight,
    borderBottomWidth: 1,
  },

  headerTopContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },

  headerActionButton: {
    marginLeft: 16,
  },

  headerActionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

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
