import { useState } from 'react';
import { Text, TextInput, SafeAreaView, StyleSheet, Modal, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import Timer from './components/Timer';
import EditableListItem from './components/EditableListItem';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskNotes, setTaskNotes] = useState('');
  const stack = createStackNavigator();
  
  function MyStack() {
  return (
    <stack.Navigator>
      <stack.Screen name="Timer" component={Timer} />
    </stack.Navigator>
    );
  }
  const [data, setData] = useState([
    { id: '1', title: 'Treinar', notes: 'Progredir carga'},
    { id: '2', title: 'Comer', notes: 'Bater micronutrientes necessarios'},
  ]);

  const handleSave = (itemId: string, editedTitle: string, editedNotes: string) => {
  const updatedData = data.map((item) =>
    item.id === itemId ? { ...item, title: editedTitle, notes: editedNotes } : item
  );
  setData(updatedData);
  setModalVisible(false);
};

  const handleDelete = (itemId: string) => {
  setData((prevData) => prevData.filter((item) => item.id !== itemId));
  };

  const handleSaveTask = () => {
  const newTask = {
    id: (data.length + 1).toString(),
    title: taskTitle,
    notes: taskNotes,
  };
  setData((prevData) => [...prevData, newTask]);
  setTaskTitle('');
  setTaskNotes('');
  setModalVisible(false);
};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>Your to do List</Text>
      <Card>
        <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EditableListItem
            item={item}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        )}
      />
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => MyStack}
      >
        <Text style={styles.textStyle}>Start</Text>
      </TouchableOpacity>
      </Card>

      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>ADD TO DO</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={styles.centeredView}>
          <SafeAreaView style={styles.modalView}>
            <Text style={styles.modalText}>TASK MANAGER</Text>

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Notes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Check List</Text>
            </TouchableOpacity>

             <TextInput
            placeholder="Title"
            style={styles.textInput}
            value={taskTitle}
            onChangeText={(text) => setTaskTitle(text)} // Atualiza o estado taskTitle
            />
            <TextInput
            placeholder="Notes"
            style={styles.textInput}
            value={taskNotes}
            onChangeText={(text) => setTaskNotes(text)} // Atualiza o estado taskNotes
            />

            <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => handleSaveTask()}
            >
            <Text style={styles.textStyle}>Save</Text>
            </TouchableOpacity>


          </SafeAreaView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f08080',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  button: {
    borderRadius: 25,
    padding:8,
  },
  buttonOpen: {
    backgroundColor: 'orange',
  },
  buttonClose: {
    backgroundColor: 'orange',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textInput:{
    height:40,
    borderColor: 'black',
    padding: 10,
    backgroundColor: 'white',
    margin: 5,
  }
});
