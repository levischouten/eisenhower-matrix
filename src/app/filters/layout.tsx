export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl font-bold">Filters</h1>
      {children}
    </div>
  );
}
