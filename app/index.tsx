// app/index.tsx
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from './pages/Home';
import NewRequestScreen from './pages/NewRequest';
import ProfileScreen from './pages/Profile';
import LoginScreen from './pages/Login';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
  const [user, setUser] = useState(null);

  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main">
            {() => <MainTabs onLogout={() => setUser(null)} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login">
            {() => <LoginScreen onLogin={() => setUser({ name: 'Usuário' })} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </PaperProvider>
  );
}
