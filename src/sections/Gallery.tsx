import { useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { galleryItems } from "../data";

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Pinterest-style masonry layout
  const columns = [
    galleryItems.filter((_, i) => i % 3 === 0),
    galleryItems.filter((_, i) => i % 3 === 1),
    galleryItems.filter((_, i) => i % 3 === 2),
  ];

  return (
    <section ref={ref} className="relative px-6 py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink to-blue font-display font-bold">
            Gallery
          </span>
          <h2 className="text-5xl md:text-6xl font-display font-black leading-tight mt-3">
            Behind the Decks
          </h2>
          <p className="text-muted text-lg mt-4 max-w-2xl mx-auto">
            Moments captured across stages, clubs, and festivals. Click any photo to explore.
          </p>
        </motion.div>

        {/* Pinterest-style Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {columns.map((column, colIndex) =>
            column.map((item, itemIndex) => (
              <motion.div
                key={item.id}
                className="group relative overflow-hidden rounded-3xl cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: (colIndex * 0.1 + itemIndex * 0.05),
                  duration: 0.6,
                }}
                onClick={() => setSelectedId(item.id)}
                style={{
                  aspectRatio: item.id % 2 === 0 ? "3/4" : "4/5",
                }}
              >
                {/* Image container */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Glass hover effect */}
                  <motion.div
                    className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                    initial={{ backdropFilter: "blur(0px)" }}
                    whileHover={{ backdropFilter: "blur(10px)" }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="text-sm font-bold text-white uppercase tracking-widest">View</span>
                    </div>
                  </motion.div>

                  {/* Title overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-bold text-sm">{item.title}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Lightbox Modal */}
        {selectedId && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative w-full rounded-3xl overflow-hidden">
                <img
                  src={galleryItems.find((item) => item.id === selectedId)?.image}
                  alt="Expanded"
                  className="w-full h-auto"
                />
              </div>

              {/* Close button */}
              <motion.button
                onClick={() => setSelectedId(null)}
                className="absolute -top-12 right-0 glass rounded-full p-3 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Navigation arrows */}
              <motion.button
                onClick={() => {
                  const currentIndex = galleryItems.findIndex((item) => item.id === selectedId);
                  const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                  setSelectedId(galleryItems[prevIndex].id);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 glass rounded-full p-3 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              <motion.button
                onClick={() => {
                  const currentIndex = galleryItems.findIndex((item) => item.id === selectedId);
                  const nextIndex = (currentIndex + 1) % galleryItems.length;
                  setSelectedId(galleryItems[nextIndex].id);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 glass rounded-full p-3 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
