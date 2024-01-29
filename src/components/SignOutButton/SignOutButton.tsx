'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';

export default function SignOutButton() {
  return (
    <Button onClick={() => signOut()} className="bg-sky-500">
      <LogOut size={16} className="mr-2" /> Logout
    </Button>
  );
}
