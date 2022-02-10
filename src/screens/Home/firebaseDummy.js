import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// firebase
import firestore from '@react-native-firebase/firestore';

const firebaseDummy = () => {
  const [userData, setUserData] = useState({
    user: {
      name: 'Vekariya Nayan',
      email: 'vekariyanayan2000@gmail.com',
      mobileno: '9106266564',
      password: 'Nayan@123',
    },
  });

  useEffect(() => {
    // getData();
    // getSize();
    // getFilterData();
    // orderByData();
    // writeData();
    // writeDataWithID();
    updateData();
  }, []);

  // perticular one data from firestore getting in firestore
  const getData = async () => {
    const mainData = await firestore()
      .collection('Users')
      .doc('Ino9ma1Ns0QE8VyRT3Ha')
      .onSnapshot(docs => {
        setUserData({
          user: {
            name: docs.data().name,
            email: docs.data().email,
            mobileno: docs.data().mobileno,
            password: docs.data().password,
          },
        });
      });
    return mainData;
  };

  // getting size of data from firestore
  const getSize = async () => {
    const size = await firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        // data size getting
        console.log('Total User :', querySnapshot.size);

        // Each user data getting using forEach loop and then console log it.
        querySnapshot.forEach(docs => {
          console.log('User :', docs._data.email);
        });
      });
  };

  // getting data from firestore with filter
  const getFilterData = async () => {
    firestore()
      .collection('Users')
      .where('age', '>=', 18) // conditional filter
      .limit(20) // limit data getting from firestore
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc);
        });
      });
  };

  // orderBy data fatching from firestore
  const orderByData = async () => {
    firestore()
      .collection('Users')
      .orderBy('id', 'desc') // orderBy data fatching from firestore
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(docs => {
          console.log('order Data :', docs);
        });
      });
  };

  // HERE FIREBASE DATA WRITTEN START

  // Firebase Data Write - new generated id  & add section using (.add) in firebase
  const writeData = async () => {
    firestore()
      .collection('Users')
      .add({
        college: 'GLS University',
        degree: 'MCA',
      })
      .then(() => {
        console.log('Data Updated using .add()');
      });
  };

  // Firebase Data Write set Data - exsiting generated id in firebase & set data old data are removing and new data are adding using (.set)
  const writeDataWithID = async () => {
    firestore()
      .collection('Users')
      .doc('xha3i89RLlh8ArNMt3r7')
      .set({
        mark: '700',
      })
      .then(() => {
        console.log('Data Updated using .set()');
      });
  };

  // Perticular id data update in firestore of firebase using (.update)

  const updateData = async () => {
    await firestore()
      .collection('Users')
      .doc('Ino9ma1Ns0QE8VyRT3Ha')
      .update({
        name: 'Pankaj Bhai Vekariya',
        email: 'pankajvekariya@gmail.com',
        age: '30',
      })
      .then(() => {
        console.log('Data Updated using .update()');
      });
  };

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default firebaseDummy;
