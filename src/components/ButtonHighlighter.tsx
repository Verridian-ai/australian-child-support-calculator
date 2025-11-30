import React from 'react';
import { Plus, Minus, X, Divide, Equal, Calculator, Delete } from 'lucide-react';

interface ButtonHighlighterProps {
  highlightedButtons: string[];
  onButtonClick: (button: string) => void;
  currentDisplay: string;
}

export default function ButtonHighlighter({ 
  highlightedButtons, 
  onButtonClick, 
  currentDisplay 
}: ButtonHighlighterProps) {
  
  const isHighlighted = (button: string) => {
    return highlightedButtons.includes(button);
  };

  const renderButton = (
    label: string | React.ReactNode,
    value: string,
    bgColor: string = 'bg-gray-100 dark:bg-gray-700',
    textColor: string = 'text-gray-800 dark:text-gray-100',
    className: string = '',
    textSize: string = 'text-lg'
  ) => (
    <button
      onClick={() => onButtonClick(value)}
      className={`
        ${bgColor} ${textColor} ${textSize} font-semibold
        rounded-md shadow-[0_3px_0_rgba(0,0,0,0.2),0_4px_4px_rgba(0,0,0,0.1)] 
        active:shadow-[0_1px_0_rgba(0,0,0,0.2)] active:translate-y-[2px]
        flex items-center justify-center
        transition-all duration-100
        border-t border-white/80 border-b border-black/10
        dark:border-white/10 dark:border-black/30
        ${className}
        ${isHighlighted(value) ? 'ring-2 ring-accent-orange ring-offset-2 ring-offset-gray-300 dark:ring-offset-dark-800 brightness-110 z-10 transform scale-95 translate-y-[1px]' : ''}
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="flex justify-center perspective-1000">
      {/* Calculator Body */}
      <div className="bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 p-5 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.3),0_10px_20px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] w-full max-w-[340px] border border-gray-400/50 dark:border-gray-700/50 relative overflow-hidden transform transition-transform hover:scale-[1.01] duration-500">
        
        {/* Top Blue Bezel with 3D effect */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#1e4b8f] to-[#163a6f] rounded-t-[22px] z-0 shadow-md">
          <div className="flex justify-between items-start p-5">
            <div className="text-white font-serif font-bold text-xl tracking-wide italic drop-shadow-md">Canon</div>
            <div className="text-white/90 text-xs font-sans font-medium">LS-100TS</div>
          </div>
          {/* Solar Panel with realistic reflection */}
          <div className="absolute top-5 right-5 w-20 h-8 bg-[#2a2a2a] rounded border border-gray-600/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="w-full h-full grid grid-cols-4 gap-[1px] opacity-80">
              {[1,2,3,4].map(i => <div key={i} className="bg-[#3a2a2a]"></div>)}
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Display Area with Bevel */}
        <div className="relative z-10 mt-20 mb-8">
          <div className="bg-[#9ea792] p-1 rounded-lg border border-gray-400 shadow-[inset_0_2px_6px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.3)]">
            <div className="bg-[#c8cfc0] h-20 rounded flex flex-col relative shadow-inner overflow-hidden font-lcd">
              <div className="absolute top-1 left-2 text-[10px] text-black/60 font-mono">M</div>
              <div className="flex-1 flex items-center justify-end px-3">
                <div className="text-right text-5xl font-mono tracking-widest text-black/90 drop-shadow-sm overflow-hidden whitespace-nowrap font-digital">
                  {currentDisplay || '0'}
                </div>
              </div>
            </div>
          </div>
          <div className="text-center text-[#1e4b8f] dark:text-blue-400 text-xs font-bold mt-2 tracking-widest uppercase drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]">Tax & Business</div>
        </div>

        {/* Keypad */}
        <div className="relative z-10 grid grid-cols-5 gap-3">
          {/* Row 1: Tax/Rate buttons */}
          {renderButton('TAX+', 'TAX+', 'bg-[#4a7bb5]', 'text-white', 'text-[10px]', 'text-[10px]')}
          {renderButton('TAX-', 'TAX-', 'bg-[#4a7bb5]', 'text-white', 'text-[10px]', 'text-[10px]')}
          {renderButton('RATE', 'RATE', 'bg-[#4a7bb5]', 'text-white', 'text-[10px]', 'text-[10px]')}
          <div className="col-span-2"></div> 
          
          {/* Row 2: Red/Pink Function Keys + Memory */}
          {renderButton('CI/C', 'C', 'bg-[#b95e6d]', 'text-white', '', 'text-xs')}
          {renderButton('→', 'BACK', 'bg-[#b95e6d]', 'text-white', '', 'text-lg')}
          {renderButton('RM/CM', 'RM', 'bg-[#b95e6d]', 'text-white', '', 'text-[10px]')}
          {renderButton('M+', 'M+', 'bg-gray-400 dark:bg-gray-600', 'text-white', '', 'text-xs')}
          {renderButton('M-', 'M-', 'bg-gray-400 dark:bg-gray-600', 'text-white', '', 'text-xs')}

          {/* Row 3 */}
          {renderButton('7', '7', 'bg-gray-100 dark:bg-gray-700', 'text-gray-800 dark:text-white', '', 'text-xl')}
          {renderButton('8', '8', 'bg-gray-100 dark:bg-gray-700', 'text-gray-800 dark:text-white', '', 'text-xl')}
          {renderButton('9', '9', 'bg-gray-100 dark:bg-gray-700', 'text-gray-800 dark:text-white', '', 'text-xl')}
          {renderButton('%±', '%', 'bg-gray-300 dark:bg-gray-600', 'text-gray-900 dark:text-white', '', 'text-sm')}
          {renderButton('√', 'SQRT', 'bg-gray-300 dark:bg-gray-600', 'text-gray-900 dark:text-white', '', 'text-lg')}

          {/* Row 4 */}
          {renderButton('4', '4', 'bg-gray-100 dark:bg-gray-700', 'text-gray-800 dark:text-white', '', 'text-xl')}
          {renderButton('5', '5', 'bg-gray-100 dark:bg-gray-700', 'text-gray-800 dark:text-white', '', 'text-xl')}
          {renderButton('6', '6', 'bg-gray-100 dark:bg-gray-700', 'text-gray-800 dark:text-white', '', 'text-xl')}
          {renderButton(<X className="h-4 w-4" />, '×', 'bg-gray-300 dark:bg-gray-600', 'text-gray-900 dark:text-white', '', 'text-xl')}
          {renderButton(<Divide className="h-4 w-4" />, '÷', 'bg-gray-300 dark:bg-gray-600', 'text-gray-900 dark:text-white', '', 'text-xl')}

          {/* Row 5 */}
          {renderButton('1', '1', 'bg-gray-100 dark:bg-gray-700', 'text-gray-800 dark:text-white', '', 'text-xl')}
          {renderButton('2', '2', 'bg-gray-100 dark:bg-gray-700', 'text-gray-800 dark:text-white', '', 'text-xl')}
          {renderButton('3', '3', 'bg-gray-100 dark:bg-gray-700', 'text-gray-800 dark:text-white', '', 'text-xl')}
          {renderButton(<Plus className="h-5 w-5" />, '+', 'bg-gray-300 dark:bg-gray-600', 'text-gray-900 dark:text-white', 'row-span-2 h-full', 'text-xl')}
          {renderButton(<Minus className="h-5 w-5" />, '-', 'bg-gray-300 dark:bg-gray-600', 'text-gray-900 dark:text-white', '', 'text-xl')}

          {/* Row 6 */}
          {renderButton('0', '0', 'bg-gray-100 dark:bg-gray-700', 'text-gray-800 dark:text-white', '', 'text-xl')}
          {renderButton('.', '.', 'bg-gray-100 dark:bg-gray-700', 'text-gray-800 dark:text-white', '', 'text-xl')}
          {renderButton('±', 'SIGN', 'bg-gray-100 dark:bg-gray-700', 'text-gray-800 dark:text-white', '', 'text-lg')}
          {/* + occupied by rowspan */}
          {renderButton(<Equal className="h-5 w-5" />, '=', 'bg-gray-300 dark:bg-gray-600', 'text-gray-900 dark:text-white', '', 'text-xl')}
        </div>

        {/* Guide Overlay Text */}
        {highlightedButtons.length > 0 && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none z-20">
            <div className="bg-accent-orange/90 text-white text-xs px-3 py-1 rounded-full shadow-lg animate-bounce">
              Press Here
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
