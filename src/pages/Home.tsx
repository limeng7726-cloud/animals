import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import AnimalCard from '../components/common/AnimalCard';
import useData from '../hooks/useData';
import { ArrowRight, Sparkles } from 'lucide-react';
import SnakeGame from '../components/game/SnakeGame';
import { useSound } from '../hooks/useSound';

const Home: React.FC = () => {
  const { animals, loading } = useData();
  const navigate = useNavigate();
  const playSound = useSound();

  const featuredAnimals = animals.slice(0, 3);

  const handleAnimalClick = (id: string) => {
    playSound('click');
    navigate(`/animals/${id}`);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="mb-6 inline-block p-3 bg-orange-100 rounded-full text-orange-600">
            <Sparkles size={24} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-handwriting mb-6 text-stone-800">
            欢迎来到我的<span className="text-orange-500">数字动物寓所</span>
          </h1>
          <p className="text-xl text-stone-600 mb-8 leading-relaxed">
            在这里，每一只动物都有自己的故事。
            <br />
            无论是慵懒的午后，还是欢快的奔跑，
            <br />
            我们都想与你分享这份纯粹的快乐。
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/gallery"
              className="px-8 py-3 bg-orange-500 text-white rounded-full font-bold shadow-lg hover:bg-orange-600 hover:shadow-xl transition-all flex items-center"
              onClick={() => playSound('click')}
            >
              浏览相册 <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 bg-white text-stone-700 border border-stone-200 rounded-full font-bold shadow-sm hover:bg-stone-50 transition-all"
              onClick={() => playSound('click')}
            >
              了解更多
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Animals */}
      <section className="mb-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-stone-800 mb-2">认识我们的朋友</h2>
            <p className="text-stone-500">每一位都是独一无二的家庭成员</p>
          </div>
          <Link 
            to="/gallery" 
            className="text-orange-500 hover:text-orange-600 font-medium flex items-center"
            onClick={() => playSound('click')}
          >
            查看全部 <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAnimals.map((animal) => (
              <AnimalCard 
                key={animal.id} 
                animal={animal} 
                onClick={() => handleAnimalClick(animal.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Latest Updates Teaser */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">最新故事</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useData().stories.slice(0, 2).map((story) => (
            <Link 
                key={story.id} 
                to={`/stories/${story.id}`} 
                className="group"
                onClick={() => playSound('click')}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-stone-100 h-full flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={story.cover_image} 
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm">
                    阅读更多
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-stone-400 text-sm mb-2">{story.created_at}</div>
                  <h3 className="text-xl font-bold text-stone-800 mb-3 group-hover:text-orange-500 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-stone-600 text-sm line-clamp-2 mb-4 flex-grow">
                    {story.content}
                  </p>
                  <div className="flex items-center text-orange-500 font-bold text-sm">
                    查看详情 <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link
            to="/stories"
            className="inline-flex items-center px-6 py-3 bg-stone-800 text-white rounded-full font-bold hover:bg-stone-900 transition-colors"
            onClick={() => playSound('click')}
          >
            阅读更多故事
          </Link>
        </div>
      </section>

      {/* Snake Game Section */}
      <SnakeGame />
    </Layout>
  );
};

export default Home;
