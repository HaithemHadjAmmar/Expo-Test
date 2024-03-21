import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Person Table</Text>
      {data ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.person}>
             <Text style={styles.personText}>id: {item.id}</Text>
              <Text style={styles.personText}>Nom: {item.nom}</Text>
              <Text style={styles.personText}>Prénom: {item.prénom}</Text>
              <Text style={styles.personText}>Email: {item.email}</Text>
              <Text style={styles.personText}>Date de naissance: {item.date_de_naissance}</Text>
              <Text style={styles.personText}>Sexe: {item.sexe}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noDataText}>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    color: 'black',
    fontWeight: '700',
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  person: {
    marginBottom: '2%',
    padding: '2%',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  personText: {
    color: 'black',
    marginBottom: 5,
  },
  noDataText: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PersonTable;
