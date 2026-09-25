import React from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFallDetection } from './src/hooks/useFallDetection';
import { StatusBanner } from './src/components/StatusBanner';
import { TelemetryCard } from './src/components/TelemetryCard';

export default function App() {
  const {
    state,
    voiceStatus,
    liveG,
    vector,
    resetToNormal,
    triggerTestFall,
  } = useFallDetection();

  const isFallen = state === 'FALLEN';

  return (
    <SafeAreaView style={[styles.safeArea, isFallen ? styles.bgFallen : styles.bgNormal]}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBanner isFallen={isFallen} voiceStatus={voiceStatus} />
        <TelemetryCard liveG={liveG} vector={vector} />

        {isFallen ? (
          <TouchableOpacity style={styles.resetBtn} onPress={resetToNormal}>
            <Text style={styles.resetBtnText}>↺ MANUAL RESET</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.testBtn} onPress={triggerTestFall}>
            <Text style={styles.testBtnText}>⚡ Simulate Test Fall</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  bgNormal: {
    backgroundColor: '#0f172a',
  },
  bgFallen: {
    backgroundColor: '#b91c1c',
  },
  container: {
    padding: 24,
    paddingTop: 40,
    justifyContent: 'center',
    flexGrow: 1,
    gap: 20,
  },
  resetBtn: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  resetBtnText: {
    color: '#b91c1c',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
  testBtn: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  testBtnText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
});
