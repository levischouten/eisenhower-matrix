import Header from "./_components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen items-center bg-slate-50/50">
      <Header />
      <main className="flex-1 px-4 py-8 max-w-6xl w-full">{children}</main>
    </div>
  );
}
