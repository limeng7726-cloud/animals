import React from 'react';
import { motion } from 'framer-motion';
import { Animal } from '../../types';

interface AnimalCardProps {
  animal: Animal;
  onClick?: () => void;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer border border-orange-100 hover:border-orange-300 transition-colors"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden bg-orange-50">
        <img
          src={animal.avatar_url}
          alt={animal.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white text-xl font-bold">{animal.name}</h3>
          <p className="text-white/90 text-sm">{animal.species}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full font-medium">
            {animal.personality}
          </span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">{animal.description}</p>
      </div>
    </motion.div>
  );
};

export default AnimalCard;
