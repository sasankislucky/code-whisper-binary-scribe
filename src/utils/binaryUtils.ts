
// Function to convert binary to ASCII
export const binaryToAscii = (binary: string): string => {
  // Remove any spaces or non-binary characters
  const cleanBinary = binary.replace(/[^01]/g, '');
  
  // Check if we have valid binary input
  if (!cleanBinary || /[^01]/.test(cleanBinary)) {
    return 'Invalid binary input';
  }
  
  // Ensure the binary string length is a multiple of 8
  if (cleanBinary.length % 8 !== 0) {
    return 'Binary length must be a multiple of 8';
  }
  
  // Convert binary to ASCII
  let ascii = '';
  for (let i = 0; i < cleanBinary.length; i += 8) {
    const byte = cleanBinary.substr(i, 8);
    const decimalValue = parseInt(byte, 2);
    ascii += String.fromCharCode(decimalValue);
  }
  
  return ascii;
};

// Function to convert binary to C code
export const binaryToC = (binary: string): string => {
  const ascii = binaryToAscii(binary);
  if (ascii.startsWith('Invalid') || ascii.startsWith('Binary')) {
    return ascii;
  }
  
  // Basic C structure
  return `#include <stdio.h>

int main() {
  // Binary converted to C
  printf("${ascii.replace(/"/g, '\\"').replace(/\n/g, '\\n')}");
  return 0;
}`;
};

// Function to convert binary to C++
export const binaryCpp = (binary: string): string => {
  const ascii = binaryToAscii(binary);
  if (ascii.startsWith('Invalid') || ascii.startsWith('Binary')) {
    return ascii;
  }
  
  // Basic C++ structure
  return `#include <iostream>

int main() {
  // Binary converted to C++
  std::cout << "${ascii.replace(/"/g, '\\"').replace(/\n/g, '\\n')}" << std::endl;
  return 0;
}`;
};

// Function to convert binary to C Shell script
export const binaryCShell = (binary: string): string => {
  const ascii = binaryToAscii(binary);
  if (ascii.startsWith('Invalid') || ascii.startsWith('Binary')) {
    return ascii;
  }
  
  // Basic C Shell script
  return `#!/bin/csh
# Binary converted to C Shell

echo "${ascii.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
};

// Syntax highlighting function
export const applySyntaxHighlighting = (code: string, language: string): string => {
  // Define patterns for different languages
  const patterns = {
    keywords: {
      c: /\b(auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/g,
      cpp: /\b(auto|break|case|char|class|const|continue|default|delete|do|double|else|enum|extern|float|for|friend|goto|if|inline|int|long|namespace|new|operator|private|protected|public|register|return|short|signed|sizeof|static|struct|switch|template|this|throw|try|typedef|union|unsigned|using|virtual|void|volatile|while)\b/g,
      cshell: /\b(alias|break|breaksw|case|cd|continue|default|echo|else|end|endif|endsw|eval|exec|exit|foreach|goto|if|logout|nice|nohup|onintr|repeat|set|setenv|shift|source|switch|then|umask|unalias|unset|unsetenv|wait|while)\b/g
    },
    types: {
      c: /\b(bool|FILE|size_t|time_t)\b/g,
      cpp: /\b(bool|string|vector|map|set|list|queue|stack|FILE|size_t|time_t)\b/g,
      cshell: /\b(string)\b/g
    },
    functions: {
      c: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
      cpp: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
      cshell: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g
    },
    strings: {
      all: /"([^"\\]|\\.)*"/g
    },
    comments: {
      c: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
      cpp: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
      cshell: /#.*$/gm
    },
    operators: {
      all: /[+\-*/%=&|^~<>!?:;]/g
    }
  };
  
  // Apply syntax highlighting based on language
  let highlightedCode = code;
  let lang = language.toLowerCase();
  
  // Map to supported languages
  if (lang === 'c++') lang = 'cpp';
  if (lang === 'c shell') lang = 'cshell';
  
  if (!['c', 'cpp', 'cshell'].includes(lang)) {
    lang = 'c'; // Default to C
  }
  
  // Replace HTML special characters
  highlightedCode = highlightedCode.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // Replace strings (same for all languages)
  highlightedCode = highlightedCode.replace(patterns.strings.all, '<span class="string">$&</span>');
  
  // Replace comments
  highlightedCode = highlightedCode.replace(patterns.comments[lang], '<span class="comment">$&</span>');
  
  // Replace keywords
  highlightedCode = highlightedCode.replace(patterns.keywords[lang], '<span class="keyword">$&</span>');
  
  // Replace types
  highlightedCode = highlightedCode.replace(patterns.types[lang], '<span class="type">$&</span>');
  
  // Replace functions
  highlightedCode = highlightedCode.replace(patterns.functions[lang], '<span class="function">$1</span>(');
  
  // Replace operators
  highlightedCode = highlightedCode.replace(patterns.operators.all, '<span class="operator">$&</span>');
  
  // Replace newlines with <br>
  highlightedCode = highlightedCode.replace(/\n/g, '<br>');
  
  return highlightedCode;
};
