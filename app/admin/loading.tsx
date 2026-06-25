export default function AdminLoading() {
  return (
    <main className="min-h-[100dvh] bg-prestige-canvas px-4 py-8 text-prestige-ink">
      <div className="mx-auto max-w-7xl">
        <div className="glass-gold h-20 animate-pulse rounded-[2rem]" />
        <div className="grid gap-8 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <div className="h-4 w-40 rounded-full bg-prestige-gold/20" />
            <div className="h-28 max-w-xl rounded-[1.5rem] bg-prestige-gold/10" />
            <div className="h-20 max-w-lg rounded-[1.5rem] bg-prestige-gold/10" />
          </div>
          <div className="glass-gold-strong grid gap-3 rounded-[2rem] p-3 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-44 animate-pulse rounded-[1.45rem] bg-[#0d0b07]/78" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
