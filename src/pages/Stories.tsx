import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import useData from '../hooks/useData';

const Stories: React.FC = () => {
  const { stories, animals, comments, loading } = useData();

  const getAnimalName = (animalId: string) => {
    return animals.find(a => a.id === animalId)?.name || '未知动物';
  };

  const getCommentCount = (storyId: string) => {
    return comments.filter(c => c.story_id === storyId).length;
  };

  return (
    <Layout>
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold font-handwriting mb-4 text-stone-800">动物日记</h1>
        <p className="text-stone-600">分享我们生活中的点点滴滴</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-12">
          {stories.map((story, index) => (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              key={story.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-100 flex flex-col md:flex-row hover:shadow-xl transition-shadow"
            >
              <div className="md:w-2/5 relative overflow-hidden group">
                <img
                  src={story.cover_image}
                  alt={story.title}
                  className="w-full h-full object-cover min-h-[250px] transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-orange-600 flex items-center shadow-sm">
                  <User size={14} className="mr-1" />
                  {getAnimalName(story.animal_id)}
                </div>
              </div>
              
              <div className="md:w-3/5 p-8 flex flex-col">
                <div className="flex items-center text-stone-400 text-sm mb-4 space-x-4">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {story.created_at}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle size={14} className="mr-1" />
                    {getCommentCount(story.id)} 评论
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-stone-800 mb-4 hover:text-orange-500 transition-colors cursor-pointer">
                  {story.title}
                </h2>
                
                <p className="text-stone-600 mb-6 line-clamp-3 leading-relaxed flex-grow">
                  {story.content}
                </p>

                <div className="mt-auto pt-4">
                  <Link
                    to={`/stories/${story.id}`}
                    className="inline-flex items-center text-orange-500 font-bold hover:text-orange-600 transition-colors"
                  >
                    阅读全文 <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Stories;
