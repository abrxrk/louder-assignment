import { useEffect, useState } from "react";
import { api } from "./services/api";
import Header from "./components/layout/Header";
import EventCard from "./components/events/EventCard";
import SubscribeModal from "./components/modals/SubscriberModal";
import WelcomeModal from "./components/modals/WelcomeModal";
import { Loader2 } from "lucide-react";

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Only fetch events when welcome modal is dismissed
    if (!showWelcomeModal) {
      fetchEvents();
    }
  }, [showWelcomeModal]);

  const fetchEvents = async () => {
    try {
      const res = await api.getEvents();
      // Backend returns { success: true, count: n, data: [...] }
      if (res.success && Array.isArray(res.data)) {
        setEvents(res.data);
      }
    } catch (error) {
      console.error("Failed to load events", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWelcomeGetEvents = () => {
    setShowWelcomeModal(false);
    setIsSubscribeModalOpen(true);
  };

  const handleSubscribeComplete = () => {
    setIsSubscribeModalOpen(false);
  };

  const handleGetTickets = (event) => {
    setSelectedEvent(event);
    setIsSubscribeModalOpen(true);
  };

  const handleCloseTicketModal = () => {
    setIsSubscribeModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-white selection:bg-zinc-800">
      {/* Welcome Modal - Shows on first load */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onGetEvents={handleWelcomeGetEvents}
      />

      {/* Main Content - Only shown after welcome modal */}
      {!showWelcomeModal && (
        <>
          <Header />

          <main className="container mx-auto px-4 py-12 max-w-7xl">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                Sydney Events
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Discover live music, festivals, and gigs happening across
                Sydney.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-500">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span>Live data from sydney.com</span>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col justify-center items-center h-96 gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-white" />
                <p className="text-sm text-zinc-500">Loading events...</p>
              </div>
            ) : events.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {events.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    onGetTickets={handleGetTickets}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 border border-zinc-800 rounded-lg">
                <p className="text-zinc-400 font-medium">No events found</p>
                <p className="text-zinc-600 text-sm mt-2">Check back later</p>
              </div>
            )}
          </main>
        </>
      )}

      {/* Subscribe Modal - Shows when clicking Get Tickets or after welcome */}
      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={
          selectedEvent ? handleCloseTicketModal : handleSubscribeComplete
        }
        eventUrl={selectedEvent?.eventUrl}
        eventTitle={selectedEvent?.title}
        isInitialSubscribe={!selectedEvent}
      />
    </div>
  );
}

export default App;
