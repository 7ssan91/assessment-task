import React, { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./CardBanner.module.css";

export const CardBanner: React.FC<any> = ({ itemList }) => {
  console.log(itemList);

  return (
    <>
      {itemList?.map((card: any) => (
          <div
          key={`banner-${card.id}`}
            className={twMerge(
              "p-8 rounded-2xl relative overflow-hidden bg-opacity-20 w-full",
              styles["banner-box"]
            )}
            style={
              {
                backgroundColor: card.backgroundColor, // Apply main background color
                "--tw-before-bg": card.shapeBg || "#FFC6CD", // Custom variable for before background
                "--tw-after-bg": card.shapeBg || "#FFC6CD", // Custom variable for after background
              } as CSSProperties
            }
          >
            <div className="relative z-[1] flex justify-between md:flex-row flex-col">
              {/* Image */}
              <div className="px-[12px] flex items-center justify-center md:justify-start mb-[12px] md:mb-0">
                <img
                  src={card.image}
                  alt={card.altText}
                  className="w-[280px] h-[280px] md:w-[230px] md:h-[230px] lg:w-[230px] lg:h-[230px] max-w-full"
                />
              </div>
              {/* Content */}
              <div className="max-w-[250px] px-[12px] flex flex-col justify-center text-left md:text-left md:items-start items-center">
                <h5
                  className="font-quicksand mb-[15px] text-[31px] font-bold tracking-wider leading-[1.2] lg:text-[28px] sm:text-[24px]"
                  style={{ color: card.textColor }}
                >
                  {card.title}
                </h5>
                <p
                  className="font-poppins text-[16px] font-light leading-[28px] tracking-wide mb-[15px] sm:mb-[8px] sm:text-[14px]"
                  style={{ color: "#686e7d" }}
                >
                  {card.description}
                </p>
                <a
                  href={card.buttonLink}
                  className="transition-all duration-300 ease-in-out font-poppins leading-[28px] tracking-wide py-[5px] px-[15px] text-[14px] bg-transparent rounded-[10px] border border-solid"
                  style={{
                    color: card.textColor,
                    borderColor: card.textColor,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = card.hoverBgColor;
                    e.currentTarget.style.color = card.hoverTextColor;
                    e.currentTarget.style.borderColor = card.hoverBgColor;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = card.textColor;
                    e.currentTarget.style.borderColor = card.textColor;
                  }}
                >
                  {card.buttonText}
                </a>
              </div>
            </div>
          </div>
      ))}
    </>
  );
};
