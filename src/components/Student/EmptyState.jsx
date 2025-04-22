// EmptyState.jsx - Component for when there are no grades or a teacher hasn't been selected
import { motion } from 'framer-motion';

export default function EmptyState({ message }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md rounded-lg p-8 text-center"
    >
      <div className="mx-auto flex items-center justify-center h-12 w-12 text-gray-400">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="mt-2 text-lg font-medium text-gray-900">{message}</h3>
      <p className="mt-1 text-gray-500">
        When grades are available, they will appear here.
      </p>
    </motion.div>
  );
}