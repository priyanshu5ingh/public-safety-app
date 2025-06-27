// src/screens/ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import app from '../firebaseConfig';
import { StackNavigationProp } from '@react-navigation/stack';

const auth = getAuth(app);

type RootStackParamList = {
  Profile: undefined;
  Login: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email || '');
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error: any) {
      console.error('Logout failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome</Text>
      <Text style={styles.email}>{userEmail}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  heading: {
    fontSize: 24, marginBottom: 10
  },
  email: {
    fontSize: 18, marginBottom: 20
  }
});

export default ProfileScreen;