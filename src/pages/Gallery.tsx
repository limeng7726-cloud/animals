import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import Layout from '../components/layout/Layout';
import useData from '../hooks/useData';
import { Photo } from '../types';

const Gallery: React.FC = () => {
  const { photos, animals, loading } = useData();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredPhotos = filter === 'all' 
    ? photos 
    : photos.filter(p => p.animal_id === filter);

  return (
    <Layout>
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold font-handwriting mb-4 text-stone-800">美好瞬间</h1>
        <p className="text-stone-600">记录每一个闪闪发光的时刻</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            filter === 'all' 
              ? 'bg-orange-500 text-white shadow-md' 
              : 'bg-white text-stone-600 hover:bg-orange-50'
          }`}
        >
          全部
        </button>
        {animals.map(animal => (
          <button
            key={animal.id}
            onClick={() => setFilter(animal.id)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === animal.id 
                ? 'bg-orange-500 text-white shadow-md' 
                : 'bg-white text-stone-600 hover:bg-orange-50'
            }`}
          >
            {animal.name}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={photo.id}
                className="group relative cursor-pointer break-inside-avoid"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="bg-white p-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg mb-3">
                    <img 
                      src={photo.image_url} 
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <h3 className="font-bold text-stone-800 truncate pr-2">{photo.title}</h3>
                    <div className="flex items-center text-rose-500">
                      <Heart size={16} className="fill-current" />
                      <span className="ml-1 text-sm font-medium">{photo.likes_count}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:w-2/3 bg-black flex items-center justify-center">
                <img 
                  src={selectedPhoto.image_url} 
                  alt={selectedPhoto.title}
                  className="max-h-[60vh] md:max-h-full w-auto object-contain"
                />
              </div>
              <div className="md:w-1/3 p-6 md:p-8 flex flex-col bg-white overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-stone-800 mb-2">{selectedPhoto.title}</h2>
                    <span className="text-sm text-stone-500">{selectedPhoto.created_at}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedPhoto(null)}
                    className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-stone-500" />
                  </button>
                </div>
                
                <p className="text-stone-600 leading-relaxed mb-8 flex-grow">
                  {selectedPhoto.story}
                </p>

                <div className="mt-auto">
                  <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                        {animals.find(a => a.id === selectedPhoto.animal_id)?.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-stone-700">
                        {animals.find(a => a.id === selectedPhoto.animal_id)?.name}
                      </span>
                    </div>
                    <button className="flex items-center space-x-2 text-rose-500 hover:bg-rose-50 px-4 py-2 rounded-full transition-colors">
                      <Heart className="fill-current" />
                      <span className="font-bold">{selectedPhoto.likes_count}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
