import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";
import { Loader2, Ticket, X } from "lucide-react";

export default function SubscribeModal({
  isOpen,
  onClose,
  eventUrl,
  eventTitle,
  isInitialSubscribe = false,
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Send email to backend
      await api.subscribe(email);

      // 2. If it's for a specific event, redirect to ticket URL
      if (eventUrl && !isInitialSubscribe) {
        window.open(eventUrl, "_blank");
      }

      // 3. Reset and close
      setEmail("");
      onClose();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4 text-zinc-400" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded">
              <Ticket className="h-5 w-5 text-black" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-white">
            {isInitialSubscribe ? "Subscribe for Updates" : "Get Tickets"}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            {isInitialSubscribe ? (
              "Enter your email to get notified about new events in Sydney."
            ) : (
              <>
                Enter your email to continue to{" "}
                <span className="font-medium text-white">{eventTitle}</span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubscribe} className="space-y-5 py-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-zinc-300">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-white"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}

          <DialogFooter className="sm:justify-start gap-2">
            <Button
              type="submit"
              className="flex-1 bg-white hover:bg-zinc-100 text-black font-medium"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {loading
                ? "Processing..."
                : isInitialSubscribe
                ? "Subscribe"
                : "Continue"}
            </Button>
            {isInitialSubscribe && (
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent border-zinc-700 text-white hover:bg-zinc-800 hover:text-white"
              >
                Skip
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
