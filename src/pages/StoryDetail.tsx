import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, MessageCircle, Share2, Heart } from 'lucide-react';
import Layout from '../components/layout/Layout';
import useData from '../hooks/useData';

const StoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { stories, animals, comments, addComment, loading } = useData();
  const [commentName, setCommentName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [liked, setLiked] = useState(false);

  // 查找当前故事
  const story = stories.find(s => s.id === id);
  
  // 查找关联动物
  const animal = story ? animals.find(a => a.id === story.animal_id) : null;
  
  // 查找相关评论
  const storyComments = comments.filter(c => c.story_id === id);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </Layout>
    );
  }

  if (!story) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">找不到该故事</h2>
          <p className="text-stone-600 mb-8">这个故事可能已经被删除了，或者从来就没有存在过。</p>
          <Link to="/stories" className="px-6 py-2 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-colors">
            返回故事列表
          </Link>
        </div>
      </Layout>
    );
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentContent.trim()) return;

    setSubmitting(true);
    try {
      await addComment({
        story_id: story.id,
        visitor_name: commentName,
        content: commentContent
      });
      setCommentContent('');
      setCommentName('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-4xl mx-auto px-4"
      >
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-stone-500 hover:text-orange-500 transition-colors font-medium mt-8"
        >
          <ArrowLeft size={20} className="mr-2" /> 返回上一页
        </button>

        <article className="bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-100 mb-12">
          {/* Cover Image */}
          <div className="relative h-64 md:h-96 w-full overflow-hidden">
            <img
              src={story.cover_image}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center text-white/90 text-sm mb-3 space-x-4">
                <span className="bg-orange-500 px-3 py-1 rounded-full text-white font-bold text-xs flex items-center">
                  <User size={12} className="mr-1" />
                  {animal?.name || '未知动物'}
                </span>
                <span className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {story.created_at}
                </span>
                <span className="flex items-center">
                  <MessageCircle size={14} className="mr-1" />
                  {storyComments.length} 评论
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white font-handwriting leading-tight">
                {story.title}
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="prose prose-lg prose-stone max-w-none mb-12">
              <p className="whitespace-pre-line leading-relaxed text-stone-700">
                {story.content}
              </p>
            </div>

            <div className="flex justify-between items-center py-6 border-t border-stone-100">
              <div className="flex space-x-4">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                    liked ? 'bg-red-50 text-red-500' : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <Heart size={20} className={liked ? 'fill-current' : ''} />
                  <span className="font-bold">{liked ? '已喜欢' : '喜欢'}</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-stone-50 text-stone-600 rounded-full hover:bg-stone-100 transition-colors">
                  <Share2 size={20} />
                  <span className="font-bold">分享</span>
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100 mb-12">
          <h3 className="text-2xl font-bold text-stone-800 mb-8 flex items-center">
            <MessageCircle className="mr-3 text-orange-500" />
            访客留言 ({storyComments.length})
          </h3>

          <div className="space-y-8 mb-12">
            {storyComments.length === 0 ? (
              <p className="text-stone-500 text-center py-8 bg-stone-50 rounded-xl">
                还没有人留言，快来抢沙发吧！
              </p>
            ) : (
              storyComments.map((comment) => (
                <div key={comment.id} className="flex space-x-4 pb-6 border-b border-stone-100 last:border-0">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-bold shrink-0">
                    {comment.visitor_name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="font-bold text-stone-800 mr-2">{comment.visitor_name}</span>
                      <span className="text-xs text-stone-400">{comment.created_at}</span>
                    </div>
                    <p className="text-stone-600">{comment.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleCommentSubmit} className="bg-stone-50 p-6 rounded-2xl">
            <h4 className="font-bold text-stone-800 mb-4">发表评论</h4>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <input
                type="text"
                placeholder="你的名字"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
              <textarea
                placeholder="写下你的想法..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent h-32 resize-none"
                required
              ></textarea>
            </div>
            <div className="text-right">
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 bg-stone-800 text-white rounded-full font-bold hover:bg-stone-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? '提交中...' : '发布评论'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </Layout>
  );
};

export default StoryDetail;
