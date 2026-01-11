import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Sparkles } from "lucide-react";

export default function WelcomeModal({ isOpen, onGetEvents }) {
  return (
    <Dialog open={isOpen} modal>
      <DialogContent
        className="sm:max-w-lg bg-zinc-900 border-zinc-800 text-white"
        hideClose
      >
        <DialogHeader>
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-white rounded-xl">
              <Calendar className="h-10 w-10 text-black" />
            </div>
          </div>
          <DialogTitle className="text-3xl text-center text-white mb-3">
            Welcome to Louder
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-400 text-base leading-relaxed">
            Discover amazing events happening across Sydney.
            <br />
            Live music, festivals, concerts, and more.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <div className="flex items-center gap-3 text-sm text-zinc-300 bg-zinc-800/50 p-4 rounded-lg">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            <span>99+ events updated daily</span>
          </div>
        </div>

        <Button
          onClick={onGetEvents}
          className="w-full bg-white hover:bg-zinc-100 text-black font-semibold py-6 text-lg"
        >
          Get Events
        </Button>
      </DialogContent>
    </Dialog>
  );
}
