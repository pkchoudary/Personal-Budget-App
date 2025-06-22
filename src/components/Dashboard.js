import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useAuth } from '../AuthContext';
import BottomNavBar from './BottomNavBar';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [income, setIncome] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const { currentUser } = useAuth();

  const fetchIncome = useCallback(async () => {
    if (!currentUser) return;
    const q = query(collection(db, 'income'), where('userId', '==', currentUser.uid));
    const snapshot = await getDocs(q);
    const totalIncome = snapshot.docs.reduce((sum, doc) => sum + doc.data().income, 0);
    setIncome(totalIncome);
  }, [currentUser]);

  const fetchBudgets = useCallback(async () => {
    if (!currentUser) return;
    const q = query(collection(db, 'budgets'), where('userId', '==', currentUser.uid));
    const snapshot = await getDocs(q);
    const budgetTotal = snapshot.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
    setTotalBudget(budgetTotal);
  }, [currentUser]);

  const fetchExpenses = useCallback(async () => {
    if (!currentUser) return;
    const q = query(collection(db, 'expenses'), where('userId', '==', currentUser.uid));
    const snapshot = await getDocs(q);
    const expensesTotal = snapshot.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
    setTotalExpenses(expensesTotal);
  }, [currentUser]);

  useEffect(() => {
    fetchIncome();
    fetchBudgets();
    fetchExpenses();
  }, [fetchIncome, fetchBudgets, fetchExpenses]);

  const remainingMoney = income - (totalBudget + totalExpenses);

  const pieChartData = {
    labels: ['Budget', 'Expenses', 'Remaining'],
    datasets: [
      {
        data: [totalBudget, totalExpenses, remainingMoney > 0 ? remainingMoney : 0],
        backgroundColor: ['#4CAF50', '#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#45A049', '#FF4365', '#2A82CB'],
      },
    ],
  };

  return (
    <div>
      <BottomNavBar />
      <h2>Dashboard</h2>

      <div>
        <h3>Financial Overview</h3>
        <p><strong>Total Monthly Income:</strong> ${income}</p>
        <p><strong>Total Budget Used:</strong> ${totalBudget}</p>
        <p><strong>Total Expenses:</strong> ${totalExpenses}</p>
        <p><strong>Remaining Money:</strong> ${remainingMoney > 0 ? remainingMoney : 0}</p>
      </div>

      <div style={{ width: '50%', margin: '0 auto' }}>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
}

export default Dashboard;
