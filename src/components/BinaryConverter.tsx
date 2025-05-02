
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { binaryToC, binaryCpp, binaryCShell, applySyntaxHighlighting } from '@/utils/binaryUtils';
import { toast } from 'sonner';

const BinaryConverter = () => {
  const [binaryInput, setBinaryInput] = useState('');
  const [convertedOutput, setConvertedOutput] = useState('');
  const [activeTab, setActiveTab] = useState('c');
  const [highlightedCode, setHighlightedCode] = useState('');
  
  // Handle binary input changes
  const handleBinaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBinaryInput(e.target.value);
  };
  
  // Validate binary input
  const validateBinary = (input: string) => {
    const cleanInput = input.replace(/\s/g, '');
    return /^[01]+$/.test(cleanInput);
  };
  
  // Convert binary based on selected language
  const convertBinary = () => {
    if (!binaryInput.trim()) {
      toast.error("Please enter binary code");
      return;
    }
    
    if (!validateBinary(binaryInput)) {
      toast.error("Invalid binary input. Please enter only 0s and 1s");
      return;
    }
    
    let result = '';
    
    switch(activeTab) {
      case 'c':
        result = binaryToC(binaryInput);
        break;
      case 'cpp':
        result = binaryCpp(binaryInput);
        break;
      case 'cshell':
        result = binaryCShell(binaryInput);
        break;
      default:
        result = binaryToC(binaryInput);
    }
    
    setConvertedOutput(result);
    setHighlightedCode(applySyntaxHighlighting(result, activeTab));
    toast.success(`Successfully converted to ${activeTab === 'cpp' ? 'C++' : activeTab === 'cshell' ? 'C Shell' : 'C'}`);
  };
  
  // Handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  // Update highlighted code when output or tab changes
  useEffect(() => {
    if (convertedOutput) {
      setHighlightedCode(applySyntaxHighlighting(convertedOutput, activeTab));
    }
  }, [convertedOutput, activeTab]);
  
  return (
    <div className="w-full p-4">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-cyber-accent mb-2 tracking-wide">BINARY SCRIBE</h2>
        <p className="text-cyber-text opacity-80">Convert binary to C, C++, or C Shell</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-cyber-bg border border-cyber-grid rounded-md p-4 animate-pulse-glow">
          <h3 className="text-cyber-accent mb-2 font-semibold">Binary Input</h3>
          <Textarea 
            value={binaryInput}
            onChange={handleBinaryChange}
            placeholder="Enter binary code (0s and 1s)..."
            className="h-60 font-mono bg-cyber-bg border-cyber-grid text-cyber-text focus:border-cyber-accent resize-none"
          />
          <div className="mt-4 flex justify-between items-center">
            <Button 
              onClick={() => setBinaryInput('')}
              variant="outline"
              className="border-cyber-grid text-cyber-text hover:bg-cyber-grid hover:text-cyber-accent"
            >
              Clear
            </Button>
            
            <Button 
              onClick={convertBinary}
              className="bg-cyber-accent hover:bg-cyber-secondary text-black"
            >
              Convert
            </Button>
          </div>
          
          <div className="mt-4">
            <p className="text-xs text-cyber-text opacity-70">Example: 01001000 01100101 01101100 01101100 01101111</p>
          </div>
        </div>
        
        <div className="bg-cyber-bg border border-cyber-grid rounded-md p-4">
          <Tabs defaultValue="c" value={activeTab} onValueChange={handleTabChange}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-cyber-accent font-semibold">Converted Output</h3>
              <TabsList className="bg-cyber-grid">
                <TabsTrigger value="c" className="data-[state=active]:bg-cyber-accent data-[state=active]:text-black">C</TabsTrigger>
                <TabsTrigger value="cpp" className="data-[state=active]:bg-cyber-accent data-[state=active]:text-black">C++</TabsTrigger>
                <TabsTrigger value="cshell" className="data-[state=active]:bg-cyber-accent data-[state=active]:text-black">C Shell</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="c" className="mt-0">
              <div className="h-60 overflow-auto rounded border border-cyber-grid p-4 bg-[#0d1117] code-container">
                {highlightedCode ? (
                  <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                ) : (
                  <p className="text-gray-500 italic">C code will appear here...</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="cpp" className="mt-0">
              <div className="h-60 overflow-auto rounded border border-cyber-grid p-4 bg-[#0d1117] code-container">
                {highlightedCode ? (
                  <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                ) : (
                  <p className="text-gray-500 italic">C++ code will appear here...</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="cshell" className="mt-0">
              <div className="h-60 overflow-auto rounded border border-cyber-grid p-4 bg-[#0d1117] code-container">
                {highlightedCode ? (
                  <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                ) : (
                  <p className="text-gray-500 italic">C Shell code will appear here...</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={() => {
                if (convertedOutput) {
                  navigator.clipboard.writeText(convertedOutput);
                  toast.success("Code copied to clipboard!");
                }
              }}
              variant="outline" 
              className="border-cyber-grid text-cyber-text hover:bg-cyber-grid hover:text-cyber-accent"
              disabled={!convertedOutput}
            >
              Copy Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinaryConverter;
