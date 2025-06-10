import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import colors from '../assets/colors';
import Octicons from '@react-native-vector-icons/octicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

export default function AddPhotoFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params || {};

  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchPostDetails();
    }
  }, [id]);

  const fetchPostDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://6819fd411ac115563507532b.mockapi.io/api/post/${id}`,
      );
      const data = await response.json();
      setCaption(data.caption);
      setPhoto({uri: data.image});
    } catch (error) {
      console.log('Error fetching post details:', error);
      Alert.alert('Error', 'Failed to load post details');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    launchImageLibrary({mediaType: 'photo', quality: 0.1}, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0]);
      }
    });
  };

  const handleUpload = async () => {
    if (!photo) {
      Alert.alert('Error', 'Please select a photo first');
      return;
    }

    try {
      setLoading(true);
      
      let imageUrl = photo.uri;
      
      // Only upload new image if it's not from the existing post (has no fileName property)
      if (photo.fileName) {
        const imageFormData = new FormData();
        imageFormData.append('file', {
          uri: photo.uri,
          name: photo.fileName,
          type: photo.type,
        });

        const uploadResult = await fetch(
          'https://backend-file-praktikum.vercel.app/upload/',
          {
            method: 'POST',
            body: imageFormData,
          },
        );
        
        if (uploadResult.status !== 200) {
          throw new Error('failed to upload image');
        }
        
        const {url} = await uploadResult.json();
        imageUrl = url;
      }

      const apiUrl = isEditing 
        ? `https://6819fd411ac115563507532b.mockapi.io/api/post/${id}`
        : 'https://6819fd411ac115563507532b.mockapi.io/api/post';

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(apiUrl, {
        method,
        body: JSON.stringify({
          image: imageUrl,
          caption: caption,
          isLiked: false,
          author: {
            id: 1,
            name: 'Makrus Ali',
            image: 'https://avatars.githubusercontent.com/u/64481824?v=4',
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        navigation.goBack();
      } else {
        throw new Error(`Failed to ${isEditing ? 'update' : 'create'} post`);
      }
    } catch (error) {
      console.log('error', error);
      Alert.alert(
        'Error',
        `Gagal ${isEditing ? 'memperbarui' : 'mengunggah'} foto. Silakan coba lagi.`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTopContainer}>
          <View style={styles.headerActionContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.goBack();
              }}>
              <View style={styles.headerActionButton}>
                <Octicons name="arrow-left" color={colors.primary} size={24} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.headerTitle}>
            {isEditing ? 'Edit Foto' : 'Unggah Foto'}
          </Text>
        </View>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={{padding: 16}}>
          <Pressable
            onPress={pickImage}
            style={{
              backgroundColor: colors.primaryLight,
              borderRadius: 8,
              height: 238,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            {photo ? (
              <Image
                source={{uri: photo.uri}}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                  resizeMode: 'cover',
                }}
              />
            ) : (
              <Text style={{color: colors.primary}}>Pilih Foto</Text>
            )}
          </Pressable>
          <Text style={{color: colors.primary, paddingVertical: 8}}>
            Caption
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={12}
            textAlign="left"
            textAlignVertical="top"
            placeholder="Tulis caption..."
            placeholderTextColor={colors.secondary}
            cursorColor={colors.primary}
            selectionColor={colors.secondary}
            value={caption}
            onChangeText={setCaption}
            style={{
              minHeight: 128,
              backgroundColor: colors.primaryLight,
              color: colors.primary,
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
            }}
          />
        </View>
      </ScrollView>
      <View>
        <Pressable
          style={{
            backgroundColor: colors.primary,
            borderRadius: 8,
            paddingVertical: 14,
            alignItems: 'center',
            margin: 16,
          }}
          disabled={loading}
          android_ripple={{color: colors.primaryLight}}
          onPress={handleUpload}>
          {loading ? (
            <ActivityIndicator color={colors.background} size="small" />
          ) : (
            <Text
              style={{
                color: colors.background,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              {isEditing ? 'Perbarui' : 'Unggah'}
            </Text>
          )}
        </Pressable>
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
    padding: 16,
  },
  headerTopContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  headerActionButton: {
    paddingRight: 32,
  },
  headerActionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});