import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import CustomCursor from '../common/CustomCursor';
import ScrollProgress from '../common/ScrollProgress';
import BackToTop from '../common/BackToTop';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-orange-50/30 cursor-none-md">
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
