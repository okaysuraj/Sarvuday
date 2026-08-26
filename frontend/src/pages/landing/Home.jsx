import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-surface text-on-surface font-body-lg min-h-screen flex flex-col justify-center items-center p-margin-desktop overflow-x-hidden relative selection:bg-primary/20 selection:text-primary">
      {/* Decorative Soft Glows */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-accent-pink/20 blur-[100px] -z-10 pointer-events-none hidden lg:block animate-pulse duration-10000"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] -z-10 pointer-events-none hidden lg:block"></div>

      {/* Main Container Card */}
      <main className="w-full max-w-6xl bg-white border border-gray-100 rounded-3xl flex flex-col lg:flex-row overflow-hidden relative z-10 shadow-2xl">
        {/* Illustration Side */}
        <div className="lg:w-1/2 p-container-padding bg-slate-50 flex items-center justify-center relative min-h-[400px]">
          {/* Subtle grid background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-100 transform hover:-translate-y-1 transition-all duration-300">
            <img className="w-full h-full object-cover" alt="Illustration" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5WZ6ehV3636X2sGAOCsEAlEmhrnSR0dgU420XZYnI1ZiexLnYsjq5_rGQSYo4g046F5ibW4EH447GY-djJ8ZKQzs4eSaw04dpxo9_NqCssf26o_gweNsQXofPMSqPCjthGblx9S_u_jJzEP1YbZOeAlSe8TF5co2rN9b1ese2bQXqolyvMKKvF3esUEaerhJO6qrFgTJ89xLZr7plVuXEsYqQYLNnmbzJjOo2rzfmV3i7oCb6qJ_qXg"/>
          </div>
        </div>

        {/* Content Side */}
        <div className="lg:w-1/2 p-container-padding lg:p-stack-lg flex flex-col justify-center items-start text-left bg-white">
          <div className="mb-stack-md inline-block">
            <span className="font-headline-sm text-sm text-primary font-semibold tracking-wide px-4 py-2 bg-primary/10 rounded-full inline-block uppercase">
              Welcome to SarvUday
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg text-gray-900 mb-stack-sm max-w-lg leading-tight">
            Your journey to mental clarity starts here
          </h1>
          <p className="font-body-lg text-body-lg text-gray-500 mb-stack-lg max-w-md leading-relaxed">
            A safe space to track your mood, reflect on your thoughts, and connect with professional support when you need it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Link to="/register" className="flex-1 bg-primary text-white font-label-bold text-label-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group">
              Get Started
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
            <Link to="/login" className="flex-1 bg-white text-gray-700 border border-gray-200 font-label-bold text-label-bold py-4 px-6 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center">
              Log In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

