import React, { useState } from 'react';
import { auth } from '../firebase';
import { updateProfile, updatePassword } from 'firebase/auth';
import BottomNavBar from './BottomNavBar';

function UserProfile() {
  const [name, setName] = useState(auth.currentUser?.displayName || '');
  const [email] = useState(auth.currentUser?.email || ''); // Firebase does not allow direct email updates
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      if (name !== auth.currentUser?.displayName) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      if (password) {
        await updatePassword(auth.currentUser, password);
      }
      alert('Profile updated successfully!');
      setPassword(''); // Clear password input after update
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(`Error updating profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BottomNavBar />
      <h2>User Profile</h2>
      <div>
        <label>
          <strong>Name:</strong>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>
      </div>
      <div>
        <label>
          <strong>Email:</strong>
          <input
            type="email"
            value={email}
            readOnly
            placeholder="Email cannot be changed"
          />
        </label>
      </div>
      <div>
        <label>
          <strong>Password:</strong>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </label>
      </div>
      <button onClick={handleUpdateProfile} disabled={loading}>
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
    </div>
  );
}

export default UserProfile;
