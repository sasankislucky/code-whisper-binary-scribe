
import BinaryConverter from '@/components/BinaryConverter';
import { MoveRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-cyber-bg bg-cyber-grid bg-opacity-5 animate-grid-flow">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="text-cyber-accent">Binary</span>{" "}
            <span className="text-white">Scribe</span>
          </h1>
          <p className="text-lg text-cyber-text opacity-80 max-w-3xl mx-auto">
            Transform raw binary code into human-readable C, C++, or C Shell programming languages 
            with our advanced binary parsing engine.
          </p>
        </header>
        
        <div className="mb-12 flex justify-center">
          <div className="flex space-x-2 items-center text-sm text-cyber-text opacity-70">
            <span>01000010</span>
            <MoveRight size={16} className="text-cyber-accent" />
            <span className="text-cyber-accent">#include &lt;stdio.h&gt;</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-cyber-bg to-black rounded-xl shadow-lg overflow-hidden border border-cyber-grid">
          <BinaryConverter />
        </div>
        
        <footer className="mt-16 text-center text-sm text-cyber-text opacity-60">
          <p>Binary Scribe © {new Date().getFullYear()} • A powerful binary conversion tool</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
