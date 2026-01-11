import { Calendar } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-zinc-800 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-xl z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded">
            <Calendar className="h-5 w-5 text-black" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Louder
            </h1>
            <p className="text-xs text-zinc-500">Sydney Events</p>
          </div>
        </div>
      </div>
    </header>
  );
}
