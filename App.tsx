// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
// import MapScreen from './src/screens/MapScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
// import NewsScreen from './src/screens/NewsScreen';
// import ReportScreen from './src/screens/ReportScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        {/* <Stack.Screen name="Map" component={MapScreen} /> */}
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        {/* <Stack.Screen name="News" component={NewsScreen} /> */}
        {/* <Stack.Screen name="Report" component={ReportScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}