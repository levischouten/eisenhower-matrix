import Header from "./_components/header";
import NavigationMenu from "./_components/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen h-max-screen">
      <Header />
      <div className="flex h-full">
        <div className="w-72 py-4 px-6 bg-white dark:bg-slate-950 hidden md:flex">
          <NavigationMenu />
        </div>
        <main className="flex-1 px-4 py-8 max-w-3xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
