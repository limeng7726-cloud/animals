import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import useData from '../hooks/useData';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';

const Admin: React.FC = () => {
  const { animals, photos, stories, addAnimal, addPhoto, addStory, deleteAnimal, deletePhoto, deleteStory, refreshData } = useData();
  const [activeTab, setActiveTab] = useState<'animals' | 'photos' | 'stories'>('animals');
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<any>({});

  // Simple "Auth" check
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('密码错误');
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-stone-800">管理员登录</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入管理员密码 (admin123)"
              className="w-full px-4 py-3 rounded-xl border border-orange-200 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors"
            >
              登录
            </button>
          </form>
        </div>
      </Layout>
    );
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activeTab === 'animals') {
        await addAnimal(formData);
      } else if (activeTab === 'photos') {
        await addPhoto(formData);
      } else if (activeTab === 'stories') {
        await addStory(formData);
      }
      setIsAdding(false);
      setFormData({});
      alert('添加成功！');
    } catch (error) {
      alert('添加失败');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('确定要删除吗？')) return;
    try {
      if (activeTab === 'animals') {
        await deleteAnimal(id);
      } else if (activeTab === 'photos') {
        await deletePhoto(id);
      } else if (activeTab === 'stories') {
        await deleteStory(id);
      }
    } catch (error) {
      alert('删除失败');
      console.error(error);
    }
  };

  const renderForm = () => {
    if (activeTab === 'animals') {
      return (
        <>
          <input
            placeholder="名字"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            placeholder="物种"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setFormData({ ...formData, species: e.target.value })}
          />
          <input
            placeholder="性格"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
          />
          <textarea
            placeholder="描述"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <input
            placeholder="头像URL"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
          />
        </>
      );
    } else if (activeTab === 'photos') {
      return (
        <>
          <select
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setFormData({ ...formData, animal_id: e.target.value })}
          >
            <option value="">选择动物</option>
            {animals.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
          <input
            placeholder="标题"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <textarea
            placeholder="故事"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setFormData({ ...formData, story: e.target.value })}
          />
          <input
            placeholder="图片URL"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
        </>
      );
    } else if (activeTab === 'stories') {
      return (
        <>
          <select
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setFormData({ ...formData, animal_id: e.target.value })}
          >
            <option value="">选择动物</option>
            {animals.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
          <input
            placeholder="标题"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <textarea
            placeholder="内容"
            className="w-full p-2 border rounded mb-2 h-32"
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <input
            placeholder="封面图片URL"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
          />
        </>
      );
    }
  };

  return (
    <Layout>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-stone-800">内容管理</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} className="mr-1" /> 添加新内容
        </button>
      </div>

      <div className="flex space-x-4 mb-8 border-b border-stone-200">
        {['animals', 'photos', 'stories'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-2 px-4 font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">名称/标题</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {activeTab === 'animals' && animals.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-800">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {activeTab === 'photos' && photos.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-800">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {activeTab === 'stories' && stories.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-800">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-stone-800">添加新{activeTab}</h3>
              <button onClick={() => setIsAdding(false)} className="text-stone-400 hover:text-stone-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAdd}>
              {renderForm()}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 border border-stone-200 rounded-lg text-stone-600 hover:bg-stone-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Admin;
