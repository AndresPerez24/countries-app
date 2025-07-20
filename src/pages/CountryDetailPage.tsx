import { type FC } from "react";
import { motion } from "framer-motion";
import CountryDetail from "../components/countries/CountryDetail";

const CountryDetailPage: FC = () => {
  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: "easeOut",
        }}
      >
        <CountryDetail />
      </motion.div>
    </motion.div>
  );
};

export default CountryDetailPage;
