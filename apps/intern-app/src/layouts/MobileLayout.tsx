export function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#061D33]">
      <main className="mx-auto min-h-screen w-full max-w-[430px] bg-white">
        {children}
      </main>
    </div>
  );
}