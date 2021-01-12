import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, Button, Alert, ActivityIndicator, Modal, TextInput } from 'react-native';

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState("Guest!")
  const [profileImage, setProfileImage] = useState(require('./assets/adaptive-icon.png'))

  

  const updateName = (newName) => {
    console.log('new value: ', newName)
    newName === "" ? setName("Guest") : setName(newName)
    newName != "" ? setProfileImage(require('./assets/erik-westervind-1768x2678.jpeg')) : setProfileImage(require('./assets/adaptive-icon.png'))
    

  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Header name = {name} setShowModal = {setShowModal} profileImage = {profileImage}/>
      <Feed/>
      <StatusBar style="auto" />
      <ShowModal showModal = {showModal} setShowModal = {setShowModal} updateName = {updateName}/>
    </SafeAreaView>
  );
}

const Header = ({name, setShowModal, profileImage}) => {
  return (
    <View style= {styles.header}>
        <Text style = {{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
          Hello {name}!
        </Text>
      <Profile name = {name} setShowModal = {setShowModal} profileImage = {profileImage}/>
    </View>
  );
}

const Profile = ({name, setShowModal, profileImage}) => {
  return (
    <View>
    <TouchableOpacity
    style = {{alignContent: 'flex-end'}}
    onPress={() => setShowModal(true)}
    //underlayColor='orange'
    >
  <View style = {{alignSelf: 'flex-end'}}>
    <Image style={{width:60, height:60, backgroundColor: 'white', borderRadius: 30}} source={profileImage}/>
  </View>
</TouchableOpacity>
</View>
  )
}

const ShowModal = ({showModal, setShowModal, updateName}) => {

  const [newName, setNewName] = useState("")

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible= {showModal}>
      <View style = {{flex: 1 ,justifyContent: "center", alignItems: "center"}}>
      <View style = {styles.modal}>
        <View style= {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style = {{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Name:</Text>
        
          <Button
          title="Close"
          onPress= {()=> setShowModal(false)}
          />
        </View>
        
        <TextInput style = {{backgroundColor: 'lightgrey', padding: 5}}
        placeholder = "Enter name"
        onChangeText = {text => setNewName(text)}
        />
        <Button
        title="Submit"
        onPress= {()=> {
          updateName(newName)
          setNewName('')
          setShowModal(false)
        }}/>
      </View>
      </View>
    </Modal>
  );
}

const Feed = () => {
  return (
    <ScrollView showsVerticalScrollIndicator = {false} style = {styles.feed}>
      <Text style = {{fontSize: 22, fontWeight: 'bold', alignItems: 'flex-start', width: '100%'}}>Today's Highlights</Text>
      <Article headline = {'Firest article'}/>
      <Article headline = {'Second article'}/>
      <Article headline = {'Third article'}/>
      <Article headline = {'Last article'}/>
      <Load/>
    </ScrollView>
  );
}

const Article = ({headline}) => {
  return (
  <View style = {styles.article}>
    <Text style = {{fontSize: 18, fontWeight: 'bold'}}>{headline}</Text>
    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
  </View>
  );
}

const Load = () => {  

  const [text, setText] = useState('Load more')
  const [load, setLoad] = useState(false)

  return(
    <View style = {{width: '100%', alignItems: 'center', marginBottom: 60, flexDirection: 'row', justifyContent: 'space-around'}}>
      <View style = {{flexDirection: 'row'}}>
      <Button
      title= {text}
      onPress = { () => {
        setText('Loading')
        setLoad(true)
        Alert.alert(
          "Unable To Load",
          "There was an error, please try again later.",
          [ {text: "OK", onPress: () => {
            setText('Load more')
            setLoad(false)
          }} ]
        )

      }
      }
      />
      <ActivityIndicator
      animating = {load}
      size= "small"
      hidesWhenStopped
    />
    </View>
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
    marginBottom: -44,
    //marginTop: -50
    
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#5c3185',
    padding: 20,
  },

  feed: {
    width: '100%',
    //margin: 20,
    //backgroundColor: 'yellow',
    padding: 20
  },

  article: {
    width: '100%',
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#efe6cc',
    marginTop: 20
  },

  modal: {
    flex: 0.1,
    width: '60%',
    //justifyContent: 'center',
    //height: '10%',
    //margin: 50,
    padding: 20,
    alignSelf: 'center',

    backgroundColor: 'white'
  },

});
