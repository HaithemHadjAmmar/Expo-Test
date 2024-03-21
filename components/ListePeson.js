import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
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
      <Text style={styles.title}>Liste des personnes :</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.person}>
            <Text>{item.nom}</Text>
            <Text>{item.prénom}</Text>
            <Text>{item.email}</Text>
            <Text>{item.date_de_naissance}</Text>
            <Text>{item.sexe}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: 'black', 
    fontWeight: '700',
    justifyContent: 'flex-start',
    paddingTop :'8%', 
    paddingBottom: '5%',
  },
  person: {
    color: 'black',
    marginBottom: '2%',
    padding: '2%',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default PersonTable;
