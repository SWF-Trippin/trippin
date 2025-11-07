import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import SignUp from './SignUp';
import { colors } from '../../styles/colors';
import CustomText from '../../components/ui/CustomText.tsx';
import TabNavigator from '../../navigation/TabNavigator';
import FindAccount from './FindAccount.tsx';
import ResetPassword from './ResetPassword.tsx';
import Onboarding from '../onboarding/Onboarding.tsx';
import { useNavigation } from '@react-navigation/native';

export type AuthStackParam = {
  SignUp: undefined;
  Main: undefined;
  FindAccount: undefined;
  ResetPassword: { token?: string };
  Onboarding: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParam>();

const AuthStack = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const checkInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) handleDeepLink(initialUrl);
    };

    const subscription = Linking.addEventListener('url', ({ url }) =>
      handleDeepLink(url),
    );

    const handleDeepLink = (url: string) => {
      try {
        const parsed = new URL(url);
        const path = parsed.pathname.replace('/', '');
        const token = parsed.searchParams.get('token');

        if (path === 'reset' && token) {
          navigation.navigate('ResetPassword', { token });
        }
      } catch (e) {
        console.log('딥링크 파싱 오류:', e);
      }
    };

    checkInitialUrl();
    return () => subscription.remove();
  }, [navigation]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: ({ children }) => (
          <CustomText style={{ fontSize: 18 }} weight="600">
            {children}
          </CustomText>
        ),
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.gray7,
        headerTitleStyle: {
          fontSize: 17,
          color: colors.gray7,
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: '회원가입' }}
      />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen
        name="FindAccount"
        component={FindAccount}
        options={{ title: '비밀번호 재설정' }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ title: '비밀번호 재설정' }}
      />
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
