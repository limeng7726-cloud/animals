import React, { createContext, useContext, useState, useEffect } from 'react';
import { Animal, Photo, Story, Comment, DataContextType } from '../types';

// 导入初始数据
import animalsData from '../data/animals.json';
import photosData from '../data/photos.json';
import storiesData from '../data/stories.json';
import commentsData from '../data/comments.json';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 初始化数据
  useEffect(() => {
    // 模拟异步加载
    const timer = setTimeout(() => {
      setAnimals(animalsData as Animal[]);
      setPhotos(photosData as Photo[]);
      setStories(storiesData as Story[]);
      setComments(commentsData as Comment[]);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const refreshData = async () => {
    // 纯前端模式下不需要重新 fetch，只需要重置状态（如果需要）
    // 这里我们可以模拟刷新
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  // 通用创建函数 (内存中更新)
  const createItem = async (resource: string, item: any) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      created_at: new Date().toISOString().split('T')[0],
    };

    switch (resource) {
      case 'animals':
        setAnimals(prev => [...prev, newItem]);
        break;
      case 'photos':
        setPhotos(prev => [...prev, newItem]);
        break;
      case 'stories':
        setStories(prev => [...prev, newItem]);
        break;
      case 'comments':
        setComments(prev => [...prev, newItem]);
        break;
    }
    
    return newItem;
  };

  // 通用更新函数 (内存中更新)
  const updateItem = async (resource: string, id: string, updates: any) => {
    const updateList = (list: any[]) => 
      list.map(item => item.id === id ? { ...item, ...updates } : item);

    switch (resource) {
      case 'animals':
        setAnimals(prev => updateList(prev));
        break;
      case 'photos':
        setPhotos(prev => updateList(prev));
        break;
      case 'stories':
        setStories(prev => updateList(prev));
        break;
    }
    
    // 查找并返回更新后的项目
    let updatedItem;
    if (resource === 'animals') updatedItem = animals.find(a => a.id === id);
    // ... 其他类型略过，简化逻辑
    
    return { ...updatedItem, ...updates };
  };

  // 通用删除函数 (内存中更新)
  const deleteItem = async (resource: string, id: string) => {
    const filterList = (list: any[]) => list.filter(item => item.id !== id);

    switch (resource) {
      case 'animals':
        setAnimals(prev => filterList(prev));
        break;
      case 'photos':
        setPhotos(prev => filterList(prev));
        break;
      case 'stories':
        setStories(prev => filterList(prev));
        break;
      case 'comments':
        setComments(prev => filterList(prev));
        break;
    }
  };

  const value: DataContextType = {
    animals,
    photos,
    stories,
    comments,
    loading,
    error,
    refreshData,
    addAnimal: (animal) => createItem('animals', animal),
    addPhoto: (photo) => createItem('photos', photo),
    addStory: (story) => createItem('stories', story),
    addComment: (comment) => createItem('comments', comment),
    updateAnimal: (id, updates) => updateItem('animals', id, updates),
    updatePhoto: (id, updates) => updateItem('photos', id, updates),
    updateStory: (id, updates) => updateItem('stories', id, updates),
    deleteAnimal: (id) => deleteItem('animals', id),
    deletePhoto: (id) => deleteItem('photos', id),
    deleteStory: (id) => deleteItem('stories', id),
    deleteComment: (id) => deleteItem('comments', id),
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
