import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
  children: any;
}

interface Item {
  anime: string;
  quote: string;
  character: string;
}

const AnimatedList = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch(
      `https://animechan.vercel.app/api/quotes/anime?title=One Punch Man${
        page > 1 ? `&page=${page}` : ""
      }`
    )
      .then((response) => response.json())
      .then((response) => setItems(response));
  }, [page]);

  return (
    <div className="rounded-lg border flex-col flex w-1/2 border-zinc-300">
      <AnimatedListItems direction="next" items={items} />
      <div className="flex-initial space-x-2 w-full flex items-center justify-end p-2 mt-4 bg-white">
        {[1, 2, 3].map((pageNumber) => (
          <button
            onClick={() => setPage(pageNumber)}
            className={clsx(
              "w-6 h-7 flex items-center justify-center rounded transition-colors font-semibold ",
              pageNumber === page
                ? "bg-cyan-600 text-white"
                : "bg-transparent text-zinc-600 hover:bg-zinc-100 hover:rounded-lg"
            )}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

const AnimatedListItems: React.FC<{
  items: Item[];
  direction: "previous" | "next";
}> = ({ items, direction = "previous" }) => {
  const [initialItems, setInitialItems] = useState<Item[]>();
  const [animate, setAnimate] = useState(false);
  const handleAnimationEnd = () => {
    console.log("setting animation end");
    setAnimate(false);
  };

  useEffect(() => {
    setAnimate(true);
  }, [items]);

  return (
    <ul className="w-full overflow-hidden relative space-y-2 h-[828px]">
      {/* Animation of initial items, should come from the right if animating in initially. if leaving, clicking previous page causes them to animate to the right, and next page, to the left   */}
      {items.map((item, index) => (
        <AnimatedListItem
          key={item.quote}
          show={animate}
          index={index}
          data={item}
          onAnimationEnd={
            items.length - 1 === index ? handleAnimationEnd : undefined
          }
        />
      ))}
    </ul>
  );
};

const AnimatedListItem: React.FC<{
  show: boolean;
  data: Item;
  index: number;
  onAnimationEnd?: () => void;
}> = ({ show, data, index, onAnimationEnd }) => {
  console.log("render", index);
  return (
    <Transition
      as="li"
      show={show}
      className="rounded-lg bg-white flex border-zinc-100 p-3 max-h-[76px] ease-in-out transition-all"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
      style={{ transitionDelay: `${index * 50}ms` }}
      appear
      onAnimationEnd={onAnimationEnd}
    >
      <h3 className="text-lg font-light mr-2 flex-[64px] flex-grow-0">
        {data.character}
      </h3>
      <blockquote className="rounded-md bg-slate-400 text-slate-100 italic flex-1 line-clamp">
        {data.quote}
      </blockquote>
    </Transition>
  );
};

export default AnimatedList;
