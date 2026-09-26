import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FallState } from '../types/sensors';

interface Props {
  state: FallState;
  onReset: () => void;
  onTestFall: () => void;
}

export const CompanionControls: React.FC<Props> = ({
  state,
  onReset,
  onTestFall,
}) => {
  const isFallen = state === 'FALLEN';

  return (
    <View style={styles.container}>
      {isFallen ? (
        <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
          <Text style={styles.resetBtnText}>↺ I'M OK (RESET COMPANION)</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.testBtn} onPress={onTestFall}>
          <Text style={styles.testBtnText}>⚡ Simulate Test Fall</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  resetBtn: {
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  resetBtnText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  testBtn: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  testBtnText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
});
