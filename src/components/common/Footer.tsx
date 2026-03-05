import React from 'react';
import { Heart, Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">我的数字动物寓所</h3>
            <p className="text-stone-400 text-sm">
              用爱记录每一个温暖的瞬间。
            </p>
          </div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-stone-400 hover:text-orange-500 transition-colors">
              <Github size={24} />
            </a>
            <a href="#" className="text-stone-400 hover:text-orange-500 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="mailto:contact@example.com" className="text-stone-400 hover:text-orange-500 transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-6 pt-6 text-center text-stone-500 text-sm flex items-center justify-center">
          <span>Made with</span>
          <Heart size={16} className="mx-1 text-red-500 fill-current" />
          <span>by Animal Lover &copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
