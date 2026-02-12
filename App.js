import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, View } from 'react-native';
import { i18n } from './src/i18n';

import WelcomeScreen from './src/screens/WelcomeScreen';
import CreateScreen from './src/screens/CreateScreen';
import StoryScreen from './src/screens/StoryScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await i18n.init();
      setReady(true);
    })();
  }, []);

  if (!ready) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen
          name="Create"
          component={CreateScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: '#FFF',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: 20,
                }}
              >
                <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 15 }}>
                  ← {i18n.t('back')}
                </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Settings')}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: 20,
                }}
              >
                <Text style={{ fontSize: 20 }}>⚙️</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Story"
          component={StoryScreen}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: '#FFF',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: '#FFF',
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
