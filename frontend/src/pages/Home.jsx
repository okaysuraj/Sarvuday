import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-surface text-on-surface font-body-lg min-h-screen flex flex-col justify-center items-center p-margin-desktop overflow-x-hidden selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Decorative Memphis Elements */}
      <div className="fixed top-20 left-20 w-32 h-32 rounded-full bg-accent-pink border-[1.5px] border-ink-black -z-10 animate-pulse hidden lg:block"></div>
      <div className="fixed bottom-20 right-20 w-40 h-40 bg-secondary-fixed border-[1.5px] border-ink-black -z-10 rotate-12 hidden lg:block"></div>
      <div className="fixed top-1/3 right-1/4 w-16 h-16 rounded-lg bg-accent-sage border-[1.5px] border-ink-black -z-10 -rotate-12 hidden lg:block"></div>
      <div className="fixed bottom-1/3 left-1/4 w-24 h-24 rounded-full bg-primary-fixed border-[1.5px] border-ink-black -z-10 hidden lg:block"></div>

      {/* Main Container Card */}
      <main className="w-full max-w-5xl bg-surface-container-lowest border-[1.5px] border-ink-black rounded-3xl flex flex-col lg:flex-row overflow-hidden relative z-10 shadow-[8px_8px_0px_0px_#1A1A1A]">
        {/* Illustration Side */}
        <div className="lg:w-1/2 p-container-padding bg-accent-sage flex items-center justify-center border-b-[1.5px] lg:border-b-0 lg:border-r-[1.5px] border-ink-black relative min-h-[400px]">
          {/* Subtle grid background pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1A1A1A 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          <div className="relative w-full max-w-md aspect-square rounded-2xl border-[1.5px] border-ink-black overflow-hidden bg-surface-container-lowest shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] transform -rotate-2 hover:rotate-0 transition-transform duration-300">
            <img className="w-full h-full object-cover" alt="Illustration" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5WZ6ehV3636X2sGAOCsEAlEmhrnSR0dgU420XZYnI1ZiexLnYsjq5_rGQSYo4g046F5ibW4EH447GY-djJ8ZKQzs4eSaw04dpxo9_NqCssf26o_gweNsQXofPMSqPCjthGblx9S_u_jJzEP1YbZOeAlSe8TF5co2rN9b1ese2bQXqolyvMKKvF3esUEaerhJO6qrFgTJ89xLZr7plVuXEsYqQYLNnmbzJjOo2rzfmV3i7oCb6qJ_qXg"/>
          </div>
        </div>

        {/* Content Side */}
        <div className="lg:w-1/2 p-container-padding lg:p-stack-lg flex flex-col justify-center items-center text-center bg-surface-container-lowest">
          <div className="mb-stack-md inline-block">
            <span className="font-headline-md text-headline-md text-primary font-bold tracking-tight px-4 py-2 bg-primary-fixed rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] inline-block">SarvUday</span>
          </div>

          <h1 className="font-display-lg text-display-lg text-ink-black mb-stack-sm max-w-lg">
            Your journey to mental clarity starts here
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-md">
            A safe space to track your mood, reflect on your thoughts, and connect with professional support when you need it.
          </p>

          <div className="flex flex-col sm:flex-row gap-stack-sm w-full max-w-md">
            <Link to="/register" className="flex-1 bg-primary text-on-primary font-label-bold text-label-bold py-4 px-6 rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] transition-all duration-150 flex items-center justify-center gap-2 group active:translate-x-1 active:translate-y-1 active:shadow-none">
              Get Started
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
            <Link to="/login" className="flex-1 bg-secondary-fixed text-ink-black font-label-bold text-label-bold py-4 px-6 rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] transition-all duration-150 flex items-center justify-center active:translate-x-1 active:translate-y-1 active:shadow-none">
              Log In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
