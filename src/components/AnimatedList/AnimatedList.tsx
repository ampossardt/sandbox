import { motion } from "framer-motion";

interface Props {
  index: number;
}

const AnimatedListItem = ({ index }: Props) => {
  return (
    <motion.div
      key={index}
      initial="exit"
      animate="entered"
      exit="exit"
      custom={index}
      variants={variants}
      className="bg-white p-4 font-bold"
    >
      {index}
    </motion.div>
  );
};

const variants = {
  entered: (index: number) => ({
    transition: { delay: index * 0.1 },
    scale: 1,
    opacity: 1,
  }),
  exit: (index: number) => ({
    transition: { delay: index * 0.1 },
    scale: 0.8,
    opacity: 0,
  }),
};

const range = (start: number, stop: number, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const AnimatedList = () => {
  return <div className="border rounded-xl space-y-2 p-4"></div>;
};
