import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import AnimalCard from '../components/common/AnimalCard';
import useData from '../hooks/useData';
import { ArrowRight, Sparkles } from 'lucide-react';
import SnakeGame from '../components/game/SnakeGame';

const Home: React.FC = () => {
  const { animals, loading } = useData();

  const featuredAnimals = animals.slice(0, 3);

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
            >
              浏览相册 <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 bg-white text-stone-700 border border-stone-200 rounded-full font-bold shadow-sm hover:bg-stone-50 transition-all"
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
          <Link to="/gallery" className="text-orange-500 hover:text-orange-600 font-medium flex items-center">
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
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </section>

      {/* Latest Updates Teaser */}
      <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-orange-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-orange-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-green-100 rounded-full opacity-50"></div>
        
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-800 mb-4">想要了解更多趣事？</h2>
          <p className="text-stone-600 mb-8">
            我们的生活中充满了欢笑和惊喜，每一天都有新的故事发生。
            快来阅读我们的最新日记，或者在留言板分享你的想法吧！
          </p>
          <Link
            to="/stories"
            className="inline-flex items-center px-6 py-3 bg-stone-800 text-white rounded-full font-bold hover:bg-stone-900 transition-colors"
          >
            阅读故事
          </Link>
        </div>
      </section>

      {/* Snake Game Section */}
      <SnakeGame />
    </Layout>
  );
};

export default Home;
