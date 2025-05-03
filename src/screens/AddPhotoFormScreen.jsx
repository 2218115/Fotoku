import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  ScrollView,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import colors from '../assets/colors';
import Octicons from '@react-native-vector-icons/octicons';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

export default function AddPhotoFormScreen() {
  const navigation = useNavigation();

  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState('');

  const pickImage = async () => {
    launchImageLibrary({mediaType: 'photo', quality: 0.7}, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
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
          <Text style={styles.headerTitle}>Unggah Foto</Text>
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
                source={{uri: photo}}
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
            placeholderTextColor={colors.inactive}
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
              // borderWidth: 1,
              // borderColor: colors.secondary,
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
          onPress={() => {
            navigation.goBack();
          }}>
          <Text
            style={{
              color: colors.background,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Unggah
          </Text>
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
