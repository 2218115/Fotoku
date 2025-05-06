import React, {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Octicons from '@react-native-vector-icons/octicons';
import colors from '../assets/colors.jsx';
import {PhotoCard} from '../components/PhotoCard.jsx';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

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

export default function HomeScreen() {
  const navigation = useNavigation();

  const scrollY = React.useRef(new Animated.Value(0));
  const diffY = Animated.diffClamp(scrollY.current, 0, 100).interpolate({
    inputRange: [0, 100],
    outputRange: [0, -64],
    extrapolate: 'clamp',
  });

  const [isError, setIsError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getPosts = async () => {
    try {
      setIsError(false);
      setLoading(true);
      const response = await fetch(
        'https://6819fd411ac115563507532b.mockapi.io/api/post',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      setPosts(json);
      console.log('json', json);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPosts();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, {position: 'relative'}]}>
        <View style={styles.headerTopContainer}>
          <Text style={styles.headerTitle}>Fotoku</Text>
          <View style={styles.headerActionContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('AddPhotoFormScreen');
              }}>
              <View style={styles.headerActionButton}>
                <Octicons name="diff-added" color={colors.primary} size={32} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 50,
              left: 0,
              right: 0,
              zIndex: 88,
              borderBottomColor: colors.primaryLight,
              borderBottomWidth: 1,
              paddingTop: 12,
              paddingBottom: 12,
              paddingHorizontal: 16,
              backgroundColor: colors.background,
            },
            {
              transform: [
                {
                  translateY: diffY,
                },
              ],
            },
          ]}>
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
        </Animated.View>
      </View>

      <View style={{flex: 1}}>
        {!loading ? (
          !isError ? (
            posts.length > 0 ? (
              <Animated.FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => {
                      setRefreshing(true);
                      getPosts();
                      setRefreshing(false);
                    }}
                  />
                }
                contentContainerStyle={{
                  paddingTop: 54,
                }}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {y: scrollY.current}}}],
                  {
                    useNativeDriver: true,
                  },
                )}
                data={posts}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <PhotoCard item={item} />}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 16,
                    color: colors.primary,
                  }}>
                  Tidak ada foto
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 8,
                    color: colors.secondary,
                  }}>
                  Silahkan tambahkan foto
                </Text>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate('AddPhotoFormScreen');
                  }}>
                  <View
                    style={{
                      marginTop: 16,
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      backgroundColor: colors.primary,
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        color: colors.background,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      Tambahkan Foto
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 16,
                  color: colors.primary,
                }}>
                Terjadi kesalahan
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 8,
                  color: colors.secondary,
                }}>
                Silahkan coba lagi
              </Text>
            </View>
          )
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 16,
                color: colors.primary,
              }}>
              Sedang memuat foto
            </Text>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 8,
                color: colors.secondary,
              }}>
              Silahkan tunggu sebentar
            </Text>
            <ActivityIndicator
              color={colors.primary}
              size={'large'}
              style={{marginTop: 32}}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  headerContainer: {
    backgroundColor: colors.background,
  },
  headerTopContainer: {
    padding: 16,
    zIndex: 99,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
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
