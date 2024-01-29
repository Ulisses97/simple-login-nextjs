interface IPageContentProps {
  children?: React.ReactNode;
}

export default function PageContent({ children }: IPageContentProps) {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      {children}
    </main>
  );
}
