import Link from 'next/link';
import ItemList from './ItemList';
import { SignOutButton } from '../SignOutButton';
import { getServerSession } from 'next-auth';

export default async function Header() {
  const session = await getServerSession();
  // console.log('session', session);

  return (
    <header className="w-full bg-slate-200 py-3 h-[100px] flex items-center justify-center">
      <nav className="flex items-center justify-between w-full container">
        <Link className="font-bold" href="/#">
          Logo
        </Link>
        <ul className="flex items-center justify-between gap-4">
          <ItemList label="Início" href="/" />
          <ItemList label="Público" href="/public" />
          <ItemList label="Privado" href="/private" />
          {session && <SignOutButton />}
        </ul>
      </nav>
    </header>
  );
}
