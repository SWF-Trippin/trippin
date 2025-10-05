import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MainMapScreen from './MainMapScreen';
import { Image, TouchableOpacity, View } from 'react-native';
import headerLogo from '../../assets/images/logo/header_logo.png';
import { colors } from '../../styles/colors';
import searchIcon from '../../assets/images/icon/search.png';
import postIcon from '../../assets/images/icon/posting.png';

export type HomeStackParam = {
  MainMapScreen: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParam>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTitle: () => (
          <Image
            source={headerLogo}
            style={{
              width: 59,
              height: 21,
              resizeMode: 'contain',
            }}
          />
        ),
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerRight: () => (
          <View style={{ flexDirection: 'row', gap: 14 }}>
            <TouchableOpacity style={{ width: 28, height: 28 }}>
              <Image source={searchIcon} style={{ width: 28, height: 28 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 28, height: 28 }}>
              <Image source={postIcon} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <Stack.Screen
        name="MainMapScreen"
        component={MainMapScreen}
        options={{ title: '지도' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
