import React from 'react';
import {
  View,
  Image,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  readSelectExercises,
  updateSelectExercises,
} from '../../components/SelectExercises';

import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

async function Check(patientId, exerciseId) {
  var objectId = '';
  await readSelectExercises(patientId, exerciseId).then((response) => {
    objectId = response;
  });
  if (objectId != false) updateSelectExercises(objectId);
}

export function Player(props) {
  const navigation = useNavigation();

  const url = props.route.params[0];

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={24}
            style={styles.back}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>{props.route.params[1]}</Text>
        </View>
        <View style={styles.videoBox}>
          <Image source={{ uri: url }} style={styles.videoItem} />
        </View>
        <View style={styles.description}>
          <Text style={styles.paramsTitle}>
            {props.route.params[2] != 0 ? 'Séries:' : 'Cronômetro:'}
          </Text>
          <View
            style={
              props.route.params[2] != 0 ? styles.paramsBox : styles.paramsBox2
            }
          >
            <Text style={styles.params}>
              {props.route.params[2] != 0
                ? props.route.params[2]
                : props.route.params[4] + ' segundos'}
            </Text>
          </View>
          <Text style={styles.paramsTitle}>
            {props.route.params[2] != 0 ? 'Repetições:' : ''}
          </Text>
          <View style={props.route.params[2] != 0 ? styles.paramsBox : ''}>
            <Text style={styles.params}>
              {props.route.params[2] != 0 ? props.route.params[3] : ''}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Check(props.route.params[5], props.route.params[6].id);
              navigation.navigate('ExerciseEnding', props.route.params[5]);
            }}
          >
            <View style={styles.button}>
              <Text style={styles.text_label}>{'Terminei'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
