import { motion } from "framer-motion";
interface LogoProps {
  small?: boolean;
}

export function Logo({ small = false }: LogoProps) {
  if (small) {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-lg">
        M
      </div>
    );
  }
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2"
    >
      <div className="bg-primary p-2 rounded-lg">
        <span className="text-white font-bold text-xl">MY</span>
      </div>
      <span className="text-2xl font-bold text-gray-800">Notes</span>
    </motion.div>
  );
}
