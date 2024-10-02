import React, { useCallback, useEffect, useRef, useState } from "react";
import { animated, useTransition } from "react-spring";

export const Banner = () => {
  const ref = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [items, set] = useState<string[]>([]);
  const transitions = useTransition(items, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: "perspective(600px) rotateX(0deg)",
      color: "#5C5273",
    },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: "perspective(600px) rotateX(180deg)", color: "#F68188" },
      { transform: "perspective(600px) rotateX(0deg)" },
    ],
    leave: [
      { color: "#5C5273" },
      { innerHeight: 0 },
      { opacity: 0, height: 0 },
    ],
    update: { color: "#F68188" },
  });

  const reset = useCallback(() => {
    ref.current.forEach(clearTimeout);
    ref.current = [];
    set([]);
    ref.current.push(
      setTimeout(() => set(["Happiness", "Delievery", "Service"]), 2000)
    );
    ref.current.push(setTimeout(() => set(["Happiness", "Service"]), 5000));
    ref.current.push(
      setTimeout(() => set(["Happiness", "Delievery", "Service"]), 8000)
    );
  }, []);

  useEffect(() => {
    reset();
    return () => ref.current.forEach(clearTimeout);
  }, []);

  return (
    <div className="container mx-auto flex items-center max-h-[6000px]">
      <div className=" w-full text-start pt-15 px-5 flex flex-wrap">
        <div className="md:w-1/2 w-full text-start items-center pt-15 px-5 flex">
          <h1 className="md:text-xl text-4xl mx-auto tracking-normal md:leading-snug leading-normal  text-black-100 min-h-[240px]">
            {transitions(({ innerHeight, ...rest }, item) => (
              <animated.div
                className="overflow-hidden w-full tex-white flex justify-center md:justify-start items-center md:text-6xl font-extrabold uppercase whitespace-nowrap cursor-pointer leading-[80px] will-change-transform will-change-opacity will-change-height"
                style={rest}
                onClick={reset}
              >
                <animated.div
                  style={{ overflow: "hidden", height: innerHeight }}
                >
                  {item}
                </animated.div>
              </animated.div>
            ))}
          </h1>
        </div>
        <div className="md:w-1/2 w-full overflow-hidden text-start  px-5 flex items-start">
          <img
            src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/hero/hero-2.png"
            alt="icon"
            className="w-2/3  aspect-square"
          />
        </div>
      </div>
    </div>
  );
};
