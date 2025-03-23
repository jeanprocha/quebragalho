// app/pages/LoginScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Button } from 'react-native-paper';
import { useOAuth } from '@clerk/clerk-expo';

export default function LoginScreen() {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const handleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error('Erro no login com Google:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Bem-vindo ao Quebra Galho</Title>
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Entrar com Google
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { marginBottom: 32, textAlign: 'center' },
  button: { width: '100%', marginBottom: 16 },
});
