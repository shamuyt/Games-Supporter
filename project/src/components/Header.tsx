import React from 'react';
import { Gamepad2, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Gamepad2 className="h-6 w-6" />
          <h1 className="text-xl font-bold">GameSupport</h1>
        </div>
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <button className="p-2 hover:bg-indigo-700 rounded-full">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-indigo-700 rounded-full">
                <User className="h-5 w-5" />
              </button>
              <button 
                onClick={() => signOut()} 
                className="p-2 hover:bg-indigo-700 rounded-full"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}