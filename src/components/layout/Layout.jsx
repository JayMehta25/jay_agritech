import { useEffect } from 'react';
import { useLocation } from '../RouterBridge';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatBot from '../ui/ChatBot';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
