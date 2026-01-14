'use client'

import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Authprovider from '@/components/Authprovider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* ✅ SessionProvider must wrap components that use useSession() */}
        <Authprovider>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer/>
        </Authprovider>
      </body>
    </html>
  );
}
