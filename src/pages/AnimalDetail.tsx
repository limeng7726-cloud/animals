import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Camera, BookOpen, Cake, Fish, Star, Activity } from 'lucide-react';
import Layout from '../components/layout/Layout';
import useData from '../hooks/useData';
import { useSound } from '../hooks/useSound';

const AnimalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { animals, photos, stories, loading } = useData();
  const playSound = useSound();

  // Find the animal
  const animal = animals.find(a => a.id === id);
  
  // Find related content
  const animalPhotos = photos.filter(p => p.animal_id === id);
  const animalStories = stories.filter(s => s.animal_id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </Layout>
    );
  }

  if (!animal) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">找不到这位朋友</h2>
          <p className="text-stone-600 mb-8">它可能去探险了，或者从来就没有住在这里。</p>
          <Link 
            to="/" 
            className="px-6 py-2 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-colors"
            onClick={() => playSound('click')}
          >
            返回首页
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-5xl mx-auto px-4"
      >
        <button
          onClick={() => {
            playSound('click');
            navigate(-1);
          }}
          className="mb-6 flex items-center text-stone-500 hover:text-orange-500 transition-colors font-medium mt-8"
        >
          <ArrowLeft size={20} className="mr-2" /> 返回上一页
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-100 mb-12">
          <div className="md:flex">
            {/* Image */}
            <div className="md:w-1/2 h-80 md:h-auto relative overflow-hidden bg-orange-50">
              <img
                src={animal.avatar_url}
                alt={animal.name}
                className="w-full h-full object-cover"
              />
              {/* Status Badge */}
              {animal.status && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-white/90 backdrop-blur-sm text-stone-700 shadow-sm">
                    <Activity size={14} className="mr-1 text-green-500" />
                    {animal.status === 'sleeping' && '正在睡觉 💤'}
                    {animal.status === 'playing' && '玩耍中 🎾'}
                    {animal.status === 'eating' && '干饭时刻 🍖'}
                    {animal.status === 'curious' && '好奇观察 👀'}
                    {animal.status === 'happy' && '心情超好 ✨'}
                  </span>
                </div>
              )}
            </div>
            
            {/* Info */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-bold">
                    {animal.species}
                  </span>
                  {animal.birthday && (
                    <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-bold">
                      <Cake size={14} className="mr-1" />
                      生日: {animal.birthday}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-stone-800 font-handwriting mb-2">
                  {animal.name}
                </h1>
                <p className="text-stone-500 italic flex items-center mb-4">
                  <Heart size={16} className="mr-2 text-rose-500 fill-current" />
                  性格: {animal.personality}
                </p>

                {/* Fun Facts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {animal.favorite_food && (
                    <div className="bg-stone-50 p-3 rounded-xl flex items-start">
                      <div className="bg-white p-2 rounded-lg mr-3 shadow-sm text-orange-500">
                        <Fish size={18} />
                      </div>
                      <div>
                        <div className="text-xs text-stone-400 font-bold uppercase">最爱食物</div>
                        <div className="text-stone-700 font-medium">{animal.favorite_food}</div>
                      </div>
                    </div>
                  )}
                  {animal.hobbies && (
                    <div className="bg-stone-50 p-3 rounded-xl flex items-start">
                      <div className="bg-white p-2 rounded-lg mr-3 shadow-sm text-yellow-500">
                        <Star size={18} />
                      </div>
                      <div>
                        <div className="text-xs text-stone-400 font-bold uppercase">爱好</div>
                        <div className="text-stone-700 font-medium">{animal.hobbies.join('、')}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="prose prose-stone text-stone-600 leading-relaxed mb-8">
                <p>{animal.description}</p>
              </div>

              <div className="flex space-x-4 text-sm font-bold text-stone-400">
                <div className="flex items-center">
                    <Camera size={18} className="mr-2" />
                    {animalPhotos.length} 张照片
                </div>
                <div className="flex items-center">
                    <BookOpen size={18} className="mr-2" />
                    {animalStories.length} 个故事
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Photos */}
        {animalPhotos.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center">
              <Camera className="mr-3 text-orange-500" />
              相册集锦
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {animalPhotos.map(photo => (
                <motion.div
                  key={photo.id}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-xl overflow-hidden shadow-sm cursor-pointer relative group"
                  onClick={() => {
                      playSound('click');
                      navigate(`/gallery?filter=${animal.id}`);
                  }}
                >
                  <img
                    src={photo.image_url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end p-4">
                    <p className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity text-sm truncate w-full">
                      {photo.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
             <div className="mt-4 text-center">
                <Link 
                    to={`/gallery?filter=${animal.id}`}
                    className="text-orange-500 font-bold hover:underline"
                    onClick={() => playSound('click')}
                >
                    在相册中查看更多 &rarr;
                </Link>
            </div>
          </section>
        )}

        {/* Related Stories */}
        {animalStories.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center">
              <BookOpen className="mr-3 text-orange-500" />
              相关故事
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {animalStories.map(story => (
                <Link 
                    key={story.id} 
                    to={`/stories/${story.id}`}
                    onClick={() => playSound('click')}
                    className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-stone-100 flex h-32 md:h-40">
                    <div className="w-1/3 relative overflow-hidden">
                      <img
                        src={story.cover_image}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="w-2/3 p-4 flex flex-col justify-center">
                      <div className="flex gap-2 mb-2">
                        {story.tags?.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 bg-stone-100 text-stone-500 rounded-full font-bold">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-stone-800 mb-1 group-hover:text-orange-500 transition-colors line-clamp-1">
                        {story.title}
                      </h3>
                      <p className="text-stone-500 text-sm line-clamp-2 mb-2">
                        {story.content}
                      </p>
                      <div className="text-xs text-stone-400 mt-auto">
                        {story.created_at}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </motion.div>
    </Layout>
  );
};

export default AnimalDetail;
