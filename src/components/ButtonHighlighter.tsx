import React from 'react';
import { Plus, Minus, X, Divide, Equal } from 'lucide-react';

interface ButtonHighlighterProps {
  highlightedButtons: string[];
  onButtonClick: (button: string) => void;
  currentDisplay: string;
  compact?: boolean;
}

export default function ButtonHighlighter({
  highlightedButtons,
  onButtonClick,
  currentDisplay,
  compact = false
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
    textSize: string = ''
  ) => {
    // Responsive text sizes
    const responsiveTextSize = textSize || (compact
      ? 'text-xs sm:text-sm'
      : 'text-sm sm:text-base md:text-lg');

    return (
      <button
        onClick={() => onButtonClick(value)}
        className={`
          ${bgColor} ${textColor} ${responsiveTextSize} font-semibold
          rounded-md shadow-[0_3px_0_rgba(0,0,0,0.2),0_4px_4px_rgba(0,0,0,0.1)]
          active:shadow-[0_1px_0_rgba(0,0,0,0.2)] active:translate-y-[2px]
          flex items-center justify-center
          transition-all duration-100
          border-t border-white/80 border-b border-black/10
          dark:border-white/10 dark:border-black/30
          min-h-[40px] sm:min-h-[44px] md:min-h-[48px]
          ${className}
          ${isHighlighted(value) ? 'ring-2 sm:ring-3 ring-accent-orange ring-offset-1 sm:ring-offset-2 ring-offset-gray-300 dark:ring-offset-dark-800 brightness-110 z-10 transform scale-95 translate-y-[1px]' : ''}
        `}
      >
        {label}
      </button>
    );
  };

  // Responsive sizing classes based on compact mode
  const containerClasses = compact
    ? 'w-full max-w-[280px] sm:max-w-[300px] p-3 sm:p-4 rounded-[16px] sm:rounded-[20px]'
    : 'w-full max-w-[300px] sm:max-w-[320px] md:max-w-[340px] p-3 sm:p-4 md:p-5 rounded-[18px] sm:rounded-[22px] md:rounded-[24px]';

  const displayClasses = compact
    ? 'h-12 sm:h-14 text-2xl sm:text-3xl'
    : 'h-14 sm:h-16 md:h-20 text-3xl sm:text-4xl md:text-5xl';

  const headerClasses = compact
    ? 'h-20 sm:h-22 p-3 sm:p-4'
    : 'h-22 sm:h-24 md:h-28 p-3 sm:p-4 md:p-5';

  const gridGapClasses = compact
    ? 'gap-1.5 sm:gap-2'
    : 'gap-2 sm:gap-2.5 md:gap-3';

  return (
    <div className="flex justify-center perspective-1000 w-full">
      {/* Calculator Body */}
      <div className={`bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 shadow-[0_10px_30px_rgba(0,0,0,0.2),0_5px_15px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4),0_5px_15px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] sm:shadow-[0_15px_40px_rgba(0,0,0,0.25),0_8px_18px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)] md:shadow-[0_20px_50px_rgba(0,0,0,0.3),0_10px_20px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)] border border-gray-400/50 dark:border-gray-700/50 relative overflow-hidden transform transition-transform hover:scale-[1.01] duration-500 ${containerClasses}`}>

        {/* Top Blue Bezel with 3D effect */}
        <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-[#1e4b8f] to-[#163a6f] rounded-t-[16px] sm:rounded-t-[20px] md:rounded-t-[22px] z-0 shadow-md ${headerClasses}`}>
          <div className="flex justify-between items-start">
            <div className="text-white font-serif font-bold text-base sm:text-lg md:text-xl tracking-wide italic drop-shadow-md">Canon</div>
            <div className="text-white/90 text-[10px] sm:text-xs font-sans font-medium">LS-100TS</div>
          </div>
          {/* Solar Panel with realistic reflection */}
          <div className="absolute top-3 sm:top-4 md:top-5 right-3 sm:right-4 md:right-5 w-14 sm:w-16 md:w-20 h-6 sm:h-7 md:h-8 bg-[#2a2a2a] rounded border border-gray-600/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="w-full h-full grid grid-cols-4 gap-[1px] opacity-80">
              {[1,2,3,4].map(i => <div key={i} className="bg-[#3a2a2a]"></div>)}
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Display Area with Bevel */}
        <div className={`relative z-10 ${compact ? 'mt-14 sm:mt-16 mb-4 sm:mb-5' : 'mt-16 sm:mt-18 md:mt-20 mb-5 sm:mb-6 md:mb-8'}`}>
          <div className="bg-[#9ea792] p-0.5 sm:p-1 rounded-md sm:rounded-lg border border-gray-400 shadow-[inset_0_2px_6px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.3)]">
            <div className={`bg-[#c8cfc0] rounded flex flex-col relative shadow-inner overflow-hidden ${displayClasses}`}>
              <div className="absolute top-0.5 sm:top-1 left-1.5 sm:left-2 text-[8px] sm:text-[10px] text-black/60 font-mono">M</div>
              <div className="flex-1 flex items-center justify-end px-2 sm:px-3">
                <div className={`text-right font-mono tracking-wider sm:tracking-widest text-black/90 drop-shadow-sm overflow-hidden whitespace-nowrap ${displayClasses.split(' ').filter(c => c.includes('text-')).join(' ')}`}>
                  {currentDisplay || '0'}
                </div>
              </div>
            </div>
          </div>
          <div className="text-center text-[#1e4b8f] dark:text-blue-400 text-[10px] sm:text-xs font-bold mt-1.5 sm:mt-2 tracking-wider sm:tracking-widest uppercase drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]">Tax & Business</div>
        </div>

        {/* Keypad */}
        <div className={`relative z-10 grid grid-cols-5 ${gridGapClasses}`}>
          {/* Row 1: Tax/Rate buttons */}
          {renderButton('TAX+', 'TAX+', 'bg-[#4a7bb5]', 'text-white', '', 'text-[8px] sm:text-[9px] md:text-[10px]')}
          {renderButton('TAX-', 'TAX-', 'bg-[#4a7bb5]', 'text-white', '', 'text-[8px] sm:text-[9px] md:text-[10px]')}
          {renderButton('RATE', 'RATE', 'bg-[#4a7bb5]', 'text-white', '', 'text-[8px] sm:text-[9px] md:text-[10px]')}
          <div className="col-span-2"></div>

          {/* Row 2: Red/Pink Function Keys + Memory */}
          {renderButton('CI/C', 'C', 'bg-[#b95e6d]', 'text-white', '', 'text-[10px] sm:text-xs')}
          {renderButton('→', 'BACK', 'bg-[#b95e6d]', 'text-white', '', 'text-sm sm:text-base md:text-lg')}
          {renderButton('RM/CM', 'RM', 'bg-[#b95e6d]', 'text-white', '', 'text-[8px] sm:text-[9px] md:text-[10px]')}
          {renderButton('M+', 'M+', 'bg-gray-400 dark:bg-gray-600', 'text-white', '', 'text-[10px] sm:text-xs')}
          {renderButton('M-', 'M-', 'bg-gray-400 dark:bg-gray-600', 'text-white', '', 'text-[10px] sm:text-xs')}

          {/* Row 3 */}
          {renderButton('7', '7')}
          {renderButton('8', '8')}
          {renderButton('9', '9')}
          {renderButton('%±', '%', 'bg-gray-300 dark:bg-gray-600', 'text-gray-900 dark:text-white', '', 'text-xs sm:text-sm')}
          {renderButton('√', 'SQRT', 'bg-gray-300 dark:bg-gray-600', 'text-gray-900 dark:text-white', '', 'text-sm sm:text-base md:text-lg')}

          {/* Row 4 */}
          {renderButton('4', '4')}
          {renderButton('5', '5')}
          {renderButton('6', '6')}
          {renderButton(<X className="h-3 w-3 sm:h-4 sm:w-4" />, '×', 'bg-gray-300 dark:bg-gray-600', 'text-gray-900 dark:text-white')}
          {renderButton(<Divide className="h-3 w-3 sm:h-4 sm:w-4" />, '÷', 'bg-gray-300 dark:bg-gray-600', 'text-gray-900 dark:text-white')}

          {/* Row 5 */}
          {renderButton('1', '1')}
          {renderButton('2', '2')}
          {renderButton('3', '3')}
          {renderButton(<Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />, '+', 'bg-gray-300 dark:bg-gray-600', 'text-gray-900 dark:text-white', 'row-span-2 h-full')}
          {renderButton(<Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />, '-', 'bg-gray-300 dark:bg-gray-600', 'text-gray-900 dark:text-white')}

          {/* Row 6 */}
          {renderButton('0', '0')}
          {renderButton('.', '.')}
          {renderButton('±', 'SIGN', 'bg-gray-100 dark:bg-gray-700', 'text-gray-800 dark:text-white', '', 'text-sm sm:text-base md:text-lg')}
          {/* + occupied by rowspan */}
          {renderButton(<Equal className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />, '=', 'bg-gray-300 dark:bg-gray-600', 'text-gray-900 dark:text-white')}
        </div>

        {/* Guide Overlay Text */}
        {highlightedButtons.length > 0 && (
          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center pointer-events-none z-20">
            <div className="bg-accent-orange/90 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full shadow-lg animate-bounce">
              Press Here
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
