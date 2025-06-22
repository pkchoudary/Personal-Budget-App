import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import BottomNavBar from './BottomNavBar';

function Expenses() {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState('');
  const [expenses, setExpenses] = useState([]);
  const { currentUser } = useAuth();

  const fetchExpenses = useCallback(async () => {
    if (!currentUser) return;
    const q = query(collection(db, 'expenses'), where('userId', '==', currentUser.uid));
    const snapshot = await getDocs(q);
    setExpenses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }, [currentUser]);

  const handleSave = async () => {
    if (!description || !category || !amount || !month) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'expenses'), {
        description,
        category,
        amount: parseFloat(amount),
        month,
        userId: currentUser.uid, // Include userId field
      });
      alert('Expense saved successfully!');
      setDescription('');
      setCategory('');
      setAmount('');
      setMonth('');
      fetchExpenses(); // Refresh expenses
    } catch (error) {
      console.error('Error saving expense:', error);
      alert(`Error saving expense: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'expenses', id));
      alert('Expense deleted successfully!');
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert(`Error deleting expense: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <div>
      <BottomNavBar />
      <h2>Expenses</h2>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
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
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <button onClick={handleSave}>Save Expense</button>
      <h3>Saved Expenses</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} ({expense.category}): ${expense.amount} - {expense.month}
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;
