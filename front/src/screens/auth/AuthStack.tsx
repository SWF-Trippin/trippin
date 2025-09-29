import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SignUp from './SignUp';

export type AuthStackParam = {
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParam>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
