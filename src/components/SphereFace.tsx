import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { FallState, VoiceStatus } from '../types/sensors';
import { getSphereMood } from '../utils/sphereMood';
import { SphereMouth } from './SphereMouth';
import { SphereEyes } from './SphereEyes';
import { styles } from './SphereFace.styles';

interface Props {
  state: FallState;
  voiceStatus: VoiceStatus;
}

export const SphereFace: React.FC<Props> = ({ state, voiceStatus }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const mood = getSphereMood(state, voiceStatus);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -12, duration: 1800, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, [floatAnim]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      Animated.sequence([
        Animated.timing(blinkAnim, { toValue: 0.1, duration: 120, useNativeDriver: true }),
        Animated.timing(blinkAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
    }, 3500);
    return () => clearInterval(blinkInterval);
  }, [blinkAnim]);

  useEffect(() => {
    if (voiceStatus === 'LISTENING' || voiceStatus === 'ANALYZING') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.12, duration: mood.pulseSpeed, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1.0, duration: mood.pulseSpeed, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [voiceStatus, pulseAnim, mood.pulseSpeed]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.sphereBall,
          {
            backgroundColor: mood.sphereColor,
            borderBottomColor: mood.shadowColor,
            transform: [{ translateY: floatAnim }, { scale: pulseAnim }],
          },
        ]}
      >
        <View style={styles.glossHighlight} />
        <SphereEyes blinkAnim={blinkAnim} />
        <View style={styles.midFaceRow}>
          {mood.showBlush && <View style={styles.blushLeft} />}
          <SphereMouth type={mood.mouthType} />
          {mood.showBlush && <View style={styles.blushRight} />}
        </View>
      </Animated.View>
    </View>
  );
};
