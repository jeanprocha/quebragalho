import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Button } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session/providers/google';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [request, response, promptAsync] = useAuthRequest({
    clientId: '762139883302-ij9fj2p0c76s1vj3bemr4tldagmiq9f6a.apps.googleusercontent.com',
    androidClientId: '762139883302-3da9pemmfdkp2bpt6avbbvedpuupdg5o.apps.googleusercontent.com',
  });  
  
  console.log('🔗 Redirect URI gerado pelo Expo:', request?.redirectUri);
  

  useEffect(() => {
    if (response?.type === 'success') {
      const authResponse = response as any; // <-- ignora tipagem aqui
  
      const idToken = authResponse.authentication?.idToken;
  
      if (idToken) {
        const credential = GoogleAuthProvider.credential(idToken);
        signInWithCredential(auth, credential)
          .then(() => {
            console.log('✅ Login Google + Firebase OK');
            onLogin();
          })
          .catch((err) => console.error('Erro ao logar no Firebase:', err));
      }
    }
  }, [response]);
  

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Bem-vindo ao Quebra Galho</Title>
      <Button
        mode="contained"
        onPress={() => promptAsync()}
        disabled={!request}
        style={styles.button}
      >
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
