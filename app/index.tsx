import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

import HomeScreen from './pages/Home';
import NewRequestScreen from './pages/NewRequest';
import ProfileScreen from './pages/Profile';
import LoginScreen from './pages/Login';

const Tab = createBottomTabNavigator();

const tokenCache = {
  async getToken(key: string) {
    return SecureStore.getItemAsync(key);
  },
  async saveToken(key: string, value: string) {
    return SecureStore.setItemAsync(key, value);
  },
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50',
    text: '#212121',
    background: '#F5F5F5',
  },
};

function MainTabs({ onLogout }: { onLogout: () => void }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
            Pedidos: 'format-list-bulleted',
            Novo: 'plus-circle-outline',
            Perfil: 'account-circle',
          };
          const iconName = iconMap[route.name] || 'help-circle';
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerTitleStyle: { color: '#212121' },
        headerStyle: { backgroundColor: '#F5F5F5' },
      })}
    >
      <Tab.Screen name="Pedidos" component={HomeScreen} />
      <Tab.Screen name="Novo" component={NewRequestScreen} />
      <Tab.Screen name="Perfil">
        {() => <ProfileScreen onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}
      tokenCache={tokenCache}
    >
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />
        <NavigationContainer>
          <SignedIn>
            <MainTabs onLogout={() => {}} />
          </SignedIn>
          <SignedOut>
            <LoginScreen />
          </SignedOut>
        </NavigationContainer>
      </PaperProvider>
    </ClerkProvider>
  );
}