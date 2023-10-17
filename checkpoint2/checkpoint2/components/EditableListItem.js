import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';

const EditableListItem = ({ item, onSave, onCancel, onDelete }) => {
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedNotes, setEditedNotes] = useState(item.notes);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(item.id, editedTitle, editedNotes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(item.title);
    setEditedNotes(item.notes);
    setIsEditing(false);
    onCancel();
  };

  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      {isEditing ? (
        <View>
          <TextInput
            value={editedTitle}
            onChangeText={(title) => setEditedTitle(title)}
            placeholder="Edit title"
            autoFocus
          />
          <TextInput
            value={editedNotes}
            onChangeText={(notes) => setEditedNotes(notes)}
            placeholder="Edit notes"
          />
          <TouchableOpacity onPress={handleSave}>
            <Text>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text>Title: {item.title}</Text>
          <Text>Notes: {item.notes}</Text>
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text>Edit</Text>
          </TouchableOpacity>
          <Button title="Delete" onPress={handleDelete} color="red" />
        </View>
      )}
    </View>
  );
};

export default EditableListItem;
