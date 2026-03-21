import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { upcomingEvents, pastEvents } from '../mock';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const Events = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const EventCard = ({ event, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#800020]/10 to-[#d4af37]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative border border-[#d4af37]/30 bg-black/50 p-6 hover:border-[#d4af37]/60 transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 border-2 border-[#d4af37]/50 flex items-center justify-center">
              <Calendar className="h-7 w-7 text-[#d4af37]" strokeWidth={1.5} />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-cormorant text-2xl font-semibold text-[#d4af37] mb-3">
              {event.title}
            </h3>

            <div className="space-y-2 text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#800020]" />
                <span className="text-sm">{event.venue}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#800020]" />
                <span className="text-sm">{event.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#800020]" />
                <span className="text-sm">{event.time}</span>
              </div>
            </div>
          </div>

          {event.status === 'upcoming' && (
            <div className="flex-shrink-0">
              <div className="px-4 py-1 bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37] text-xs uppercase tracking-wider">
                Upcoming
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 bg-gradient-to-b from-[#1a0a0a] to-[#0a0a0a] overflow-hidden"
    >
      {/* Decorative corner elements */}
      <div className="absolute top-20 left-20 w-32 h-32 border-l-2 border-t-2 border-[#d4af37]/20" />
      <div className="absolute bottom-20 right-20 w-32 h-32 border-r-2 border-b-2 border-[#d4af37]/20" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100px' } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          </motion.div>

          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-[#d4af37] mb-6">
            Events
          </h2>

          <p className="text-gray-400 text-sm tracking-[0.3em] uppercase">
            Where Music Meets Divinity
          </p>
        </motion.div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-black/50 border border-[#d4af37]/30">
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#800020] data-[state=active]:to-[#9b2335] data-[state=active]:text-white text-gray-400 font-cormorant text-lg"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#800020] data-[state=active]:to-[#9b2335] data-[state=active]:text-white text-gray-400 font-cormorant text-lg"
            >
              Past Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {pastEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Events;