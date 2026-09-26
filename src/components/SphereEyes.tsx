import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface Props {
  blinkAnim: Animated.Value;
}

export const SphereEyes: React.FC<Props> = ({ blinkAnim }) => {
  return (
    <View style={styles.eyesRow}>
      <Animated.View style={[styles.eye, { transform: [{ scaleY: blinkAnim }] }]}>
        <View style={styles.pupilSparkle} />
      </Animated.View>
      <Animated.View style={[styles.eye, { transform: [{ scaleY: blinkAnim }] }]}>
        <View style={styles.pupilSparkle} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  eyesRow: {
    flexDirection: 'row',
    gap: 40,
    marginTop: 20,
    zIndex: 2,
  },
  eye: {
    width: 32,
    height: 44,
    borderRadius: 18,
    backgroundColor: '#1c1917',
    position: 'relative',
    overflow: 'hidden',
  },
  pupilSparkle: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
});
