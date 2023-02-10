import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Props {
  index: number;
}

const AnimatedListItem = ({ index }: Props) => {
  return (
    <motion.div
      key={index}
      initial="enter"
      animate="rest"
      exit="exit"
      custom={index}
      variants={variants}
      className="bg-white p-6 font-bold rounded-xl shadow-xl"
    >
      {index}
    </motion.div>
  );
};

const variants = {
  enter: (index: number) => ({
    transition: {
      type: "spring",
      delay: (index % 6 === 0 ? 6 : index % 6) * 0.1,
    },
    scale: 0,
    rotate: "90deg",
  }),
  rest: (index: number) => ({
    transition: { delay: (index % 6 === 0 ? 6 : index % 6) * 0.1 },
    scale: 1,
    rotate: "0deg",
  }),
  exit: (index: number) => ({
    transition: {
      delay: (index % 6 === 0 ? 6 : index % 6) * 0.1,
    },
    y: "100%",
    opacity: 0,
  }),
};

const range = (start: number, stop: number, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const AnimatedList = () => {
  const [page, setPage] = useState(1);
  const startingIndex = (page - 1) * 6 + 1;
  const items = range(startingIndex, startingIndex + 5);

  return (
    <div className="border rounded-xl space-y-2 p-4">
      <div className="grid gap-4">
        <AnimatePresence custom={items} mode="wait">
          {items.map((index) => (
            <AnimatedListItem key={index} index={index} />
          ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center space-x-2 pt-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <button
            className="p-2 border bg-white rounded-md"
            onClick={() => setPage(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export { AnimatedList as default };
