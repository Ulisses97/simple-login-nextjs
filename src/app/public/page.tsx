'use client';

import { PageContent } from '@/components';
import { useSession } from 'next-auth/react';

export default function PublicPage() {
  const { data: session } = useSession();

  return (
    <PageContent>
      <h1>Página publica</h1>
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </PageContent>
  );
}
