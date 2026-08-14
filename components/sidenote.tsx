'use client';

import React, {
  createContext,
  useContext,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react';

interface SidenoteContextType {
  getNextNumber: () => number;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}

const SidenoteContext = createContext<SidenoteContextType | null>(null);

export function SidenoteProvider({ children }: { children: ReactNode }) {
  const counterRef = useRef(0);
  const [activeId, setActiveId] = useState<string | null>(null);

  counterRef.current = 0;

  const getNextNumber = () => {
    counterRef.current += 1;
    return counterRef.current;
  };

  return (
    <SidenoteContext.Provider
      value={{
        getNextNumber,
        activeId,
        setActiveId,
      }}
    >
      {children}
    </SidenoteContext.Provider>
  );
}

export interface SidenoteProps {
  children: ReactNode;
  number?: string | number;
  symbol?: string;
  showIndicator?: boolean;
  className?: string;
}

export function Sidenote({
  children,
  number: explicitNumber,
  symbol,
  showIndicator = false,
  className = '',
}: SidenoteProps) {
  const ctx = useContext(SidenoteContext);
  const uniqueId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const numRef = useRef<string | number | null>(null);

  if (numRef.current === null) {
    if (explicitNumber !== undefined) {
      numRef.current = explicitNumber;
    } else if (symbol !== undefined) {
      numRef.current = symbol;
    } else if (ctx) {
      numRef.current = ctx.getNextNumber();
    } else {
      numRef.current = '';
    }
  }

  const noteLabel = numRef.current;
  const isHovered = ctx?.activeId === uniqueId;

  const toggleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleMouseEnter = () => ctx?.setActiveId(uniqueId);
  const handleMouseLeave = () => ctx?.setActiveId(null);

  return (
    <span
      className={`group/sidenote inline ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Optional Indicator or Touch Trigger on Mobile */}
      {showIndicator ? (
        <sup
          onClick={toggleOpen}
          aria-label={`Side note ${noteLabel}`}
          className={`inline-block font-normal text-[0.75em] leading-none px-1 cursor-pointer select-none transition-colors ${
            isHovered || isOpen
              ? 'text-sand-12 font-semibold'
              : 'text-sand-9 hover:text-sand-12'
          }`}
        >
          {noteLabel}
        </sup>
      ) : (
        <button
          type="button"
          onClick={toggleOpen}
          aria-label="Toggle side note"
          className="inline-block min-[1380px]:hidden text-[0.7em] text-sand-9 hover:text-sand-12 ml-1 cursor-pointer select-none underline decoration-dotted"
        >
          [note]
        </button>
      )}

      {/* Desktop Side Note (Beside main content in right margin) */}
      <span
        className={`hidden min-[1380px]:block absolute left-[calc(100%+2.5rem)] w-[210px] text-[0.78rem] leading-[1.48] text-sand-10 transition-colors duration-150 select-text font-normal ${
          isHovered ? 'text-sand-12' : 'hover:text-sand-12'
        }`}
      >
        {showIndicator && noteLabel ? (
          <span className="font-medium mr-1 text-sand-11">{noteLabel}.</span>
        ) : null}
        {children}
      </span>

      {/* Mobile / Tablet Inline Side Note */}
      {isOpen && (
        <span className="block min-[1380px]:hidden my-3 border-l-2 border-sand-6 pl-3 py-1 text-[0.82rem] leading-[1.5] text-sand-11 bg-sand-2/50 rounded-r animate-fade-in">
          {children}
        </span>
      )}
    </span>
  );
}

export default Sidenote;
