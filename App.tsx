import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import { Navigator } from './src/navigator/Navigator';

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        translucent
        backgroundColor='rgba(0,0,0,0.3)'
        barStyle='light-content'
      />
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  )
}

export default App;
