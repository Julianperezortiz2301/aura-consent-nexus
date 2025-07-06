
import React, { useState } from 'react';
import AuthForm from '@/components/AuthForm';
import StoreLanding from '@/components/StoreLanding';

interface User {
  email: string;
  consented?: boolean;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string) => {
    setUser({ email });
    console.log('User logged in:', email);
  };

  const handleLogout = () => {
    setUser(null);
    console.log('User logged out');
  };

  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return <StoreLanding user={user} onLogout={handleLogout} />;
};

export default Index;
