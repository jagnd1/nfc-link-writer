/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';

function App() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('Ready to write');
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    const checkNfc = async () => {
      const supported = await NfcManager.isSupported();
      if (supported) {
        await NfcManager.start();
        setStatus('NFC is ready! Enter a URL and tap write!')
      } else {
        setStatus('NFC not supported on this device')
      }
    };
    checkNfc();
  }, []);

  const writeNfc = async () => {
    if (!url.trim()) {
      Alert.alert('Error', 'Please enter a URL');
      return;
    }

    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 10000)
    );
    try {
      setIsWriting(true);
      setStatus('Hold your phone near the NFC tag...');
      await Promise.race([
        (async () => {
          await NfcManager.requestTechnology(NfcTech.Ndef);
          const bytes = Ndef.encodeMessage([Ndef.uriRecord(url)]);
          await NfcManager.writeNdefMessage(bytes);
        })(),
        timeout
      ]);

      setStatus('✅ Success! URL written to tag.');
      Alert.alert('Success', 'URL written to NFC tag!');
    } catch (error) {
      console.warn(error);
      if (error.message == 'Timeout') {
        setStatus('⏱️ Timeout. Try again.');
        Alert.alert('Timeout', 'Failed to write to NFC tag');
      } else {
        setStatus('❌ Failed to write. Try again.');
        Alert.alert('Error', 'Failed to write to NFC tag');
      }
    } finally {
      NfcManager.cancelTechnologyRequest();
      setIsWriting(false);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NFC Link Writer</Text>
      <TextInput
        style={styles.input}
        placeholder="Paste your URL here..."
        placeholderTextColor="#888"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        keyboardType="url"
      />
      <TouchableOpacity
        style={[styles.button, isWriting && styles.buttonDisabled]}
        onPress={writeNfc}
        disabled={isWriting}>
        <Text style={styles.buttonText}>
          {isWriting ? 'Writing...' : 'Write to NFC Tag'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1a1a2e',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0ea5e9',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#555555',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    marginTop: 30,
    fontSize: 16,
    color: '#aaaaaa',
    textAlign: 'center',
  },
});

export default App;
