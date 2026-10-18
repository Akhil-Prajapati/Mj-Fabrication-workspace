import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link?: string;
    icon?: any;
    badge?: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-4",
        className
      )}
    >
      {items.map((item, idx) => {
        const Icon = item.icon;
        const Content = (
          <div
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-blue-100 dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <div className="rounded-2xl h-full w-full p-6 overflow-hidden bg-white dark:bg-black border border-slate-200/80 dark:border-white/[0.2] group-hover:border-blue-500/50 relative z-20 transition-colors shadow-sm group-hover:shadow-lg">
              <div className="relative z-50">
                <div className="flex items-center justify-between mb-4">
                  {Icon && (
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  )}
                  {item.badge && (
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/40 px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h4 className="text-slate-900 dark:text-zinc-100 font-bold tracking-tight text-lg mb-2">
                  {item.title}
                </h4>
                <p className="text-slate-600 dark:text-zinc-400 tracking-wide leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        );

        return item.link ? (
          <Link to={item.link} key={item.title}>
            {Content}
          </Link>
        ) : (
          <div key={item.title}>{Content}</div>
        );
      })}
    </div>
  );
};
