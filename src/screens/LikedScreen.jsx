import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Octicons from '@react-native-vector-icons/octicons';
import colors from '../assets/colors.jsx';
import {PhotoCard} from '../components/PhotoCard.jsx';

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

export default function LikedScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTopContainer}>
          <Text style={styles.headerTitle}>Foto Yang Disukasi</Text>
          <View style={styles.headerActionContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.headerActionButton}>
                <Octicons name="heart" color={colors.primary} size={32} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <PhotoCard item={item} />}
      />
    </View>
  );
}

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
