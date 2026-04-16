import { type ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'orange' | 'gradient' | 'dark' | 'outlineOrange' | 'outlineBlue' | 'floatingGreen' | 'floatingBlue' | 'close' | 'unstyled';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export default function Button({ children, variant = 'primary', fullWidth, className = '', ...props }: ButtonProps) {
  const baseClasses = variant === 'unstyled' ? '' : "focus:outline-none transition-all duration-300 disabled:opacity-50 inline-flex items-center justify-center gap-2";
  
  let variantClasses = "";
  switch (variant) {
    case 'primary':
      variantClasses = "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold shadow-md hover:shadow-blue-500/30 transform hover:scale-105";
      break;
    case 'orange':
      variantClasses = "bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 shadow-xl";
      break;
    case 'gradient':
      variantClasses = "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl font-bold shadow-lg glow-orange text-white py-3 px-6";
      break;
    case 'dark':
      variantClasses = "bg-slate-800/80 hover:bg-blue-600 rounded-xl font-bold glow-blue text-white py-3 px-6";
      break;
    case 'outlineOrange':
      variantClasses = "border border-orange-500/50 hover:bg-orange-500/20 text-orange-400 font-semibold py-3 px-7 rounded-full";
      break;
    case 'outlineBlue':
      variantClasses = "border border-blue-500 hover:bg-blue-500/20 text-white rounded-full font-semibold px-8 py-4";
      break;
    case 'floatingGreen':
      variantClasses = "bg-green-500 p-4 rounded-full shadow-2xl hover:bg-green-600 float-wa group";
      break;
    case 'floatingBlue':
      variantClasses = "bg-blue-600 p-4 rounded-full shadow-2xl hover:bg-blue-700 float-wa group";
      break;
    case 'close':
      variantClasses = "bg-slate-800 p-1.5 rounded-full text-slate-400 hover:text-white transition-colors transform-none";
      break;
    case 'unstyled':
      variantClasses = "";
      break;
  }

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${widthClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
