"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      className={cn("mx-auto w-full relative", containerClassName)} // Removed bg-indigo-800
    >
      <div className="relative h-full">
        {/* Apply wobble effect only to the first child (assumed to be an Image) */}
        {React.Children.map(children, (child, index) =>
          index === 0 ? (
            <motion.div
              style={{
                transform: isHovering
                  ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.05, 1.05, 1)`
                  : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
                transition: "transform 0.1s ease-out",
              }}
            >
              {child}
            </motion.div>
          ) : (
            child
          )
        )}
      </div>
    </section>
  );
};