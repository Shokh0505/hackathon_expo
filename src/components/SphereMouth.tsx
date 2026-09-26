import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  type: 'HAPPY_SMILE' | 'WORRIED_O' | 'LISTENING_O' | 'THINKING_WAVE' | 'DIZZY_SAD';
}

export const SphereMouth: React.FC<Props> = ({ type }) => {
  switch (type) {
    case 'HAPPY_SMILE':
      return <View style={styles.happySmile} />;
    case 'WORRIED_O':
      return <View style={styles.worriedO} />;
    case 'LISTENING_O':
      return <View style={styles.listeningO} />;
    case 'THINKING_WAVE':
      return (
        <View style={styles.thinkingWaveRow}>
          <View style={styles.waveDot} />
          <View style={[styles.waveDot, { transform: [{ translateY: -3 }] }]} />
          <View style={styles.waveDot} />
        </View>
      );
    case 'DIZZY_SAD':
      return <View style={styles.sadFrown} />;
  }
};

const styles = StyleSheet.create({
  happySmile: {
    width: 44,
    height: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: '#1c1917',
    marginTop: 10,
  },
  worriedO: {
    width: 26,
    height: 32,
    borderRadius: 14,
    backgroundColor: '#1c1917',
    marginTop: 8,
  },
  listeningO: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1c1917',
    marginTop: 10,
  },
  thinkingWaveRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 14,
    alignItems: 'center',
  },
  waveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1c1917',
  },
  sadFrown: {
    width: 38,
    height: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 4,
    borderColor: '#1c1917',
    borderBottomWidth: 0,
    marginTop: 14,
  },
});
