import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Twitter, Send } from 'lucide-react';
import Layout from '../components/layout/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Profile Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12 flex flex-col md:flex-row items-center gap-12">
          <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
            <img
              src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=A%20friendly%20cartoon%20illustration%20of%20a%20person%20surrounded%20by%20cute%20animals%20(cat,%20dog,%20rabbit),%20warm%20colors,%20avatar%20style&image_size=square"
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-orange-100 shadow-md"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold font-handwriting text-stone-800 mb-4">关于我</h1>
            <p className="text-stone-600 leading-relaxed mb-6">
              嗨！我是这里的饲养员。从小我就特别喜欢小动物，总觉得它们有着治愈人心的力量。
              <br /><br />
              建立这个网站的初衷，是想记录下我和这些毛茸茸的朋友们相处的点点滴滴。
              这里不仅有它们的可爱瞬间，也有我们之间发生的有趣故事。
              <br /><br />
              希望能通过这个小小的角落，把这份温暖和快乐传递给你。
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="p-2 bg-stone-100 rounded-full text-stone-600 hover:bg-orange-100 hover:text-orange-500 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="p-2 bg-stone-100 rounded-full text-stone-600 hover:bg-orange-100 hover:text-orange-500 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="mailto:contact@example.com" className="p-2 bg-stone-100 rounded-full text-stone-600 hover:bg-orange-100 hover:text-orange-500 transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-orange-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-stone-800 mb-2">给我留言</h2>
            <p className="text-stone-600">有什么想对我和动物们说的吗？</p>
          </div>

          <form className="max-w-lg mx-auto space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-stone-700 mb-1">你的名字</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                placeholder="怎么称呼你呢？"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-stone-700 mb-1">邮箱地址</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                placeholder="方便我回复你~"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-stone-700 mb-1">留言内容</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white resize-none"
                placeholder="写下你想说的话吧..."
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl shadow-md hover:bg-orange-600 transition-colors flex items-center justify-center"
            >
              <Send size={20} className="mr-2" />
              发送留言
            </motion.button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default About;
