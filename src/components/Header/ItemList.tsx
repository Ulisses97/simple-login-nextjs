import Link from 'next/link';

interface IItemListProps {
  label: string;
  href: string;
}

export default function ItemList({ label, href = '#' }: IItemListProps) {
  return (
    <li>
      <Link
        className="text-xl cursor-pointer relative before:absolute before:bg-sky-200 before:bottom-0 before:left-0 before:h-full before:w-full before:origin-bottom before:scale-y-[0.35] hover:before:scale-y-100 before:transition-transform before:ease-in-out before:duration-500"
        href={href}
        prefetch={false}
      >
        <span className="relative">{label}</span>
      </Link>
    </li>
  );
}
