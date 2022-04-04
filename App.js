/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, Node } from 'react';
import auth from '@react-native-firebase/auth';
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

async function onAppleButtonPress() {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

  // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    // user is authenticated
  }
}

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: 800
  };
  const textStyle = {
   backgroundColor: 'purple', padding: '10%',
  };

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    appleAuth.onCredentialRevoked(async () => {
      console.warn('If this function executes, User Credentials have been Revoked');
    });

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  //if (initializing) return "last logged in html";

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
        <View>
          <AppleButton onPress={() => onAppleButtonPress()} />
        </View>
      </View>

    );
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            display: 'flex', justifyContent: 'space-evenly', alignItems: 'stretch'
          }}>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch', height: 250}}>
              <Text title="Reading" style={{backgroundColor: 'purple', padding: '10%', width: '33%'}}>
                R
              </Text>
              <Text title="Meditation" style={{backgroundColor: 'orange', padding: '10%', width: '34%'}}>
                M
              </Text>
              <Text title="Walking" style={{backgroundColor: 'purple', padding: '10%', width: '33%'}}>
                W
              </Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch', height: 250}}>
            <Text title="Exercise" style={{backgroundColor: 'green', padding: '10%', width: '50%'}}>
            r? bb? wv?
            </Text>
            <Text title="Yoga" style={{backgroundColor: 'pink', padding: '10%', width: '50%'}}>
              Y
            </Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch', height: 250}}>
            <Text title="Creative" style={{backgroundColor: 'blue', padding: '10%', width: '50%'}}>
                W? ITW?
            </Text>
            <Text title="Music" style={{backgroundColor: 'pink', padding: '10%', width: '50%'}}>
              P
            </Text>
          </View>
          {/* <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <LearnMoreLinks /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
