
// author - rahul somase


import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from '../firebase';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'items'));
      setItems(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (!newItem) return;
    await addDoc(collection(db, 'items'), { name: newItem });
    setNewItem('');
    alert('Item added!');
  };

  const handleUpdateItem = async (id, newName) => {
    const itemRef = doc(db, 'items', id);
    await updateDoc(itemRef, { name: newName });
    alert('Item updated!');
  };

  const handleDeleteItem = async (id) => {
    const itemRef = doc(db, 'items', id);
    await deleteDoc(itemRef);
    alert('Item deleted!');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <input 
        type="text" 
        value={newItem} 
        onChange={(e) => setNewItem(e.target.value)} 
        placeholder="New Item"
      />
      <button onClick={handleAddItem}>Add Item</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} 
            <button onClick={() => handleUpdateItem(item.id, prompt('New name:', item.name))}>Update</button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
