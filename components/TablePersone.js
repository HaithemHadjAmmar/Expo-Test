import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import axios from 'axios';

const PersonTable = () => {
  const [data, setData] = useState(null); // Initialize state for data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8000/api/users');
        setData(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Person Table</Text>
      {data ? (
        data.map((person) => (
          <View key={person.id} style={styles.card}>
            <Text style={styles.personText}>ID: {person.id}</Text>
            <Text style={styles.personText}>Nom: {person.nom}</Text>
            <Text style={styles.personText}>Prénom: {person.prénom}</Text>
            <Text style={styles.personText}>Email: {person.email}</Text>
            <Text style={styles.personText}>Date de naissance: {person.date_de_naissance}</Text>
            <Text style={styles.personText}>Sexe: {person.sexe}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No data available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: '5%',
  },
  title: {
    color: 'black',
    fontWeight: '700',
    fontSize: 24,
    marginTop: '10%',
    marginBottom: '5%',
  },
  card: {
    backgroundColor: '#f0f0f0',
    width: '90%',
    padding: '5%',
    marginBottom: '5%',
    borderRadius: 10,
    elevation: 5,
  },
  personText: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
  },
  noDataText: {
    color: 'gray',
    fontSize: 16,
    marginTop: '5%',
  },
});

export default PersonTable;
