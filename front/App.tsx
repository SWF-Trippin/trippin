import React, { useEffect } from 'react';
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

export const navigationRef = createNavigationContainerRef();

const App: React.FC = () => {
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

const linking = {
  prefixes: ['trippin://'],
  config: {
    screens: {
      ResetPassword: 'reset/:token',
    },
  },
  getInitialURL: async () => await Linking.getInitialURL(),
  subscribe: (listener: (arg0: string) => any) => {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);
    const subscription = Linking.addEventListener('url', onReceiveURL);
    return () => subscription.remove();
  },
};
