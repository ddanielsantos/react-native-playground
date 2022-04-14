import 'react-native-url-polyfill/auto'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'

import { AuthRoute } from './src/routes/AuthRoute';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar style="light" translucent={false} backgroundColor={'#0f0131'} />
        <AuthRoute />
      </NavigationContainer>
    </>
  );
}
