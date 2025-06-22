import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import BottomNavBar from './BottomNavBar';

function Income() {
  const [income, setIncome] = useState('');
  const [month, setMonth] = useState('');
  const [incomeList, setIncomeList] = useState([]);
  const { currentUser } = useAuth();

  const fetchIncome = useCallback(async () => {
    if (!currentUser) return;
    const q = query(collection(db, 'income'), where('userId', '==', currentUser.uid));
    const snapshot = await getDocs(q);
    setIncomeList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }, [currentUser]);

  const handleSave = async () => {
    if (!income || !month) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'income'), {
        month,
        income: parseFloat(income),
        userId: currentUser.uid, // Ensure the userId field is included
      });
      alert('Income saved successfully!');
      setIncome('');
      setMonth('');
      fetchIncome(); // Refresh income list
    } catch (error) {
      console.error('Error saving income:', error);
      alert(`Error saving income: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'income', id));
      alert('Income deleted successfully!');
      fetchIncome();
    } catch (error) {
      console.error('Error deleting income:', error);
      alert(`Error deleting income: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, [fetchIncome]);

  return (
    <div>
      <BottomNavBar />
      <h2>Income</h2>
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <input
        type="number"
        placeholder="Monthly Income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />
      <button onClick={handleSave}>Save Income</button>
      <h3>Saved Income</h3>
      <ul>
        {incomeList.map((item) => (
          <li key={item.id}>
            {item.month}: ${item.income}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Income;
