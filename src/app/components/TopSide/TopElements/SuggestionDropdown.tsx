import { motion, AnimatePresence } from "framer-motion";

export const SuggestionDropdown = ({
  focused,
  searchLoading,
  suggestions,
  onSelect,
}: {
  focused: boolean;
  searchLoading: boolean;
  suggestions: string[];
  onSelect: (city: string) => void;
}) => {
  return (
    <AnimatePresence mode="wait">
      {focused && (searchLoading || suggestions.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="dropdown-box border-inline"
        >
          {searchLoading ? (
            <div className="flex flex-col gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-10 w-full rounded-lg bg-Neutral-700 bg-[length:200%_100%] animate-shimmer"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: i * 0.15,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          ) : (
            suggestions.map((item, index) => (
              <p
                key={index}
                className="hover:bg-Neutral-700 cursor-pointer rounded-lg px-2 py-2 text-white"
                onClick={() => onSelect(item)}
              >
                {item}
              </p>
            ))
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
