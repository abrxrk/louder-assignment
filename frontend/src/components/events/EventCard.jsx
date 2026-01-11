import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";

export default function EventCard({ event, onGetTickets }) {
  const bgImage =
    event.imageUrl ||
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop";

  return (
    <Card className="group overflow-hidden flex flex-col h-full bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden bg-zinc-800">
        <img
          src={bgImage}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
      </div>

      {/* Content */}
      <CardHeader className="p-5 pb-3">
        <h3 className="text-base font-semibold text-white line-clamp-2 leading-tight min-h-[2.5rem] group-hover:text-zinc-100">
          {event.title}
        </h3>
      </CardHeader>

      <CardContent className="p-5 pt-0 flex-grow space-y-3">
        <div className="flex items-center text-xs text-zinc-400">
          <Calendar className="mr-2 h-3.5 w-3.5" />
          <span>
            {event.dateOfEvent
              ? format(new Date(event.dateOfEvent), "MMM d, yyyy")
              : "Date TBA"}
          </span>
        </div>
        <div className="flex items-center text-xs text-zinc-400">
          <MapPin className="mr-2 h-3.5 w-3.5" />
          <span className="truncate">{event.venue || "Sydney"}</span>
        </div>
        <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed">
          {event.description}
        </p>
      </CardContent>

      {/* Action Button */}
      <CardFooter className="p-5 pt-0">
        <Button
          className="w-full bg-white hover:bg-zinc-100 text-black font-medium transition-all group/btn"
          onClick={() => onGetTickets(event)}
        >
          <span>Get Tickets</span>
          <ArrowUpRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
}
