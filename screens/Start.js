import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View,} from 'react-native';

import ClothingTile from '../Components/item';

const Start = ({ navigation, route }) => {

  const [clothing, setItems] = useState([]);

  const getItems = async () => {
    try {
      const response = await fetch(
        "https://studio-orbyq.com/wp-json/wp/v2/posts?categories=41",
        {}
      );

      const json = await response.json();
        setItems(json);
    } 
    
      catch (error) {
        console.error(error);
      }

  };

  useEffect(() => {
    getItems();
  }, []);

  return (
 
    <View style={{ flexDirection: 'row', flexWrap:'wrap', alignItems: 'center', justifyContent: 'center', backgroundColor: '#050505', flex: 1, }}>

      <ClothingTile data={clothing} />
     
    </View>
    
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Start;