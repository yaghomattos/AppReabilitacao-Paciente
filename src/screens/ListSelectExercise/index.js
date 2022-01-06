import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { List } from 'react-native-paper';
import styles from './styles';

function CurrentDate() {
  var date = new Date().getDate();
  var month = new Date().getMonth();
  var year = new Date().getFullYear();

  var monName;
  monName = new Array(
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'Maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro'
  );

  return date + ' de ' + monName[month] + ', ' + year;
}

export const ListSelectExercise = (props) => {
  const navigation = useNavigation();

  const participant = props.route.params;

  const [exercise, setExercise] = useState([]);

  useEffect(() => {
    var li = [];
    database
      .ref('selectExercise')
      .get()
      .then((snapshot) => {
        snapshot.forEach((child) => {
          if (child.val().participant == participant.key) {
            li.push({
              exercise: child.val().exercise,
              numReps: child.val().numReps,
              sets: child.val().sets,
              timer: child.val().timer,
              name: child.val().name,
              description: child.val().description,
              video: child.val().video,
              preview: child.val().preview,
              participant: child.val().participant,
              className: 'exercise',
              id: child.key,
            });
          }
        });
        setExercise(li);
      });
  }, [exercise]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          style={styles.back}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.separate}>
          <Text style={styles.header_text_bold}>{'Olá, Participante'}</Text>
          <Text style={styles.header_text}>{CurrentDate()}</Text>
        </View>
        <MaterialCommunityIcons
          name="bell"
          size={30}
          color="transparent"
          style={{ paddingRight: 25 }}
        />
      </View>
      <View style={styles.viewTitle}>
        <Text style={styles.title}>{'Exercícios'}</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={exercise}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <List.Item
                style={{
                  width: 342,
                  height: item.description.length,
                  minHeight: 80,
                  justifyContent: 'center',
                  marginVertical: 38,
                  borderWidth: 1,
                  borderRadius: 8,
                }}
                title={item.name}
                titleNumberOfLines={1}
                titleStyle={styles.listTitle}
                description={item.description}
                descriptionStyle={styles.listDescription}
                descriptionNumberOfLines={100}
                onPress={() => navigation.navigate('Orientation', item)}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};