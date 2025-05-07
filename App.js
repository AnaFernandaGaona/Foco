import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditScreen';

const Stack = createStackNavigator();

export default function App() {
  const [notes, setNotes] = useState([]);

  const handleSaveNote = (note) => {
    if (note.id) {
      setNotes((prev) =>
        prev.map((n) => (n.id === note.id ? { ...n, text: note.text } : n))
      );
    } else {
      const newNote = {
        id: Date.now().toString(),
        text: note.text,
        completed: false,
      };
      setNotes((prev) => [...prev, newNote]);
    }
  };

  const handleToggleComplete = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, completed: !n.completed } : n))
    );
  };

  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Foco+">
            {(props) => (
              <HomeScreen
                {...props}
                notes={notes}
                onToggle={handleToggleComplete}
                onDelete={handleDelete}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Edit">
            {(props) => (
              <EditScreen {...props} onSave={handleSaveNote} notes={notes} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
