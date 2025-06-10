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
import { Alert } from 'react-native';

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

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://6819fd411ac115563507532b.mockapi.io/api/post/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status !== 200) {
        throw new Error('Failed to delete post');
      }
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      Alert.alert('Error', 'Gagal menghapus foto. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id) => {
    navigation.navigate('AddPhotoFormScreen', { id: id });
  }

  const handleOnPressOption = (id) => {
    Alert.alert(
      'Pilihan',
      'Apa yang ingin Anda lakukan?',
      [
        { text: 'Update', onPress: () => handleUpdate(id) },
        { text: 'Delete', onPress: () => handleDelete(id), style: 'destructive' },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  }

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
                renderItem={({item}) => <PhotoCard item={item} onPressOption={() => handleOnPressOption(item.id)} />}
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
