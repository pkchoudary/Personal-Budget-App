import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import BottomNavBar from './BottomNavBar';

function Budget() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [budgets, setBudgets] = useState([]);
  const { currentUser } = useAuth();

  const fetchBudgets = useCallback(async () => {
    if (!currentUser) return;
    const q = query(collection(db, 'budgets'), where('userId', '==', currentUser.uid));
    const snapshot = await getDocs(q);
    setBudgets(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }, [currentUser]);

  const handleSave = async () => {
    if (!category || !amount) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'budgets'), {
        category,
        amount: parseFloat(amount),
        userId: currentUser.uid, // Include userId
      });
      alert('Budget saved successfully!');
      setCategory('');
      setAmount('');
      fetchBudgets(); // Refresh budgets
    } catch (error) {
      console.error('Error saving budget:', error);
      alert(`Error saving budget: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'budgets', id));
      alert('Budget deleted successfully!');
      fetchBudgets();
    } catch (error) {
      console.error('Error deleting budget:', error);
      alert(`Error deleting budget: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  return (
    <div>
      <BottomNavBar />
      <h2>Budget</h2>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSave}>Save Budget</button>
      <h3>Saved Budgets</h3>
      <ul>
        {budgets.map((budget) => (
          <li key={budget.id}>
            {budget.category}: ${budget.amount}
            <button onClick={() => handleDelete(budget.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Budget;
