import React from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import CustomErrToast from './src/components/ui/CustomErrToast';
import CustomSuccessToast from './src/components/ui/CustomSuccessToast';
import { Linking } from 'react-native';
import { AuthStackParam } from './src/screens/auth/AuthStack';

export const navigationRef = createNavigationContainerRef<AuthStackParam>();

const App: React.FC = () => {
  const navigateFromUrl = (url: string) => {
    try {
      console.log('딥링크 감지:', url);
      const parsed = new URL(url);
      const path = parsed.pathname.replace('/', '');
      const token = parsed.searchParams.get('token');

      if (path === 'reset' && token) {
        navigationRef.navigate('ResetPassword', { token });
      }
    } catch (e) {
      console.log('딥링크 파싱 오류:', e);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ffffff"
          hidden={false}
        />
        <NavigationContainer linking={linking} ref={navigationRef}>
          <StackNavigator />
        </NavigationContainer>
        <Toast
          config={{
            myCustomToast: props => <CustomErrToast {...props} />,
            mySuccessToast: props => <CustomSuccessToast {...props} />,
          }}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const linking: any = {
  prefixes: ['trippin://'],
  config: {
    screens: {
      AuthStack: {
        screens: {
          ResetPassword: {
            path: 'reset',
            parse: {
              token: (token: string) => token,
            },
          },
        },
      },
    },
  },

  getInitialURL: async () => {
    const url = await Linking.getInitialURL();
    console.log('초기 URL:', url);
    return url;
  },
};
