import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const TotalDisplay = ({ total }) => {
  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.text}>Total: {total}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
