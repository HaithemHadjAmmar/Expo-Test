import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const PersonTable = () => {
  const [data, setData] = useState(null); // Initialize state for data
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8000/api/users');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Liste des personnes:</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : data && data.length > 0 ? ( // Check if data is available
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
        <Text style={styles.noDataText}>Aucune donnée disponible</Text>
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
    marginTop: '2%',
    marginBottom: '10%',
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
    marginBottom: '2%',
  },
  noDataText: {
    color: 'gray',
    fontSize: 16,
    marginTop: '5%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PersonTable;
