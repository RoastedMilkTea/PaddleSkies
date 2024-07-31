import React, { useState } from 'react';

const SignupForm = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [club, setClub] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup({ name, club });
    setName('');
    setClub('');
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <input
        type="text"
        placeholder="Please enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Please enter your paddling club's name"
        value={club}
        onChange={(e) => setClub(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
