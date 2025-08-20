import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
  onItemClick,
}: {
  items: {
    title: string;
    price: string;
    description: string;
    icon?: React.ReactNode; 
  }[];
  className?: string;
  onItemClick?: (item: any) => void; 
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10", className)}>
      {items.map((item, idx) => (
        <div
          key={item.title} // Use title as key since link is removed
          className="relative group block p-4 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => onItemClick && onItemClick(item)} 
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-white/10 rounded-2xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle icon={item.icon}>{item.title}</CardTitle> 
            <CardDescription>{item.description}</CardDescription>
            <CardPrice>{item.price}</CardPrice>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-6 border border-white text-white text-center backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children, icon }: { className?: string; children: React.ReactNode; icon?: React.ReactNode }) => {
  return (
    <h4 className={cn("text-white font-bold text-lg flex items-center justify-center", className)}>
      {icon && <span className="mr-2">{icon}</span>} 
      {children}
    </h4>
  );
};

export const CardPrice = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <p className={cn("text-white font-bold text-lg mt-4", className)}>{children}</p>;
};

export const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <p className={cn("mt-3 text-white text-sm", className)}>{children}</p>;
};