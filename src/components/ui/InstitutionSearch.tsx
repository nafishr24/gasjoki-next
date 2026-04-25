"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, School, GraduationCap, X } from "lucide-react";

interface InstitutionSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function InstitutionSearch({ value, onChange }: InstitutionSearchProps) {
  const [type, setType] = useState<"university" | "school">("university");
  const [inputValue, setInputValue] = useState(value);
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync with parent when value resets (e.g. form reset)
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced API search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (inputValue.length >= 5 && isOpen) {
      setHasSearched(false);
      debounceRef.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const endpoint =
            type === "university"
              ? "/api/universities/search"
              : "/api/schools/search";
          const res = await fetch(
            `${endpoint}?name=${encodeURIComponent(inputValue)}`
          );
          const json = await res.json();
          setResults(json.is_success ? json.data : []);
        } catch {
          setResults([]);
        } finally {
          setIsLoading(false);
          setHasSearched(true);
        }
      }, 500);
    } else {
      setResults([]);
      setHasSearched(false);
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [inputValue, type, isOpen]);

  const handleSelect = (name: string) => {
    setInputValue(name);
    onChange(name);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onChange(val);
    if (!isOpen) setIsOpen(true);
  };

  const handleClear = () => {
    setInputValue("");
    onChange("");
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Type Toggle Tabs */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => {
            setType("university");
            setResults([]);
            setHasSearched(false);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
            type === "university"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          Kampus
        </button>
        <button
          type="button"
          onClick={() => {
            setType("school");
            setResults([]);
            setHasSearched(false);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
            type === "school"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300"
          }`}
        >
          <School className="w-4 h-4" />
          Sekolah
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          required
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={
            type === "university"
              ? "Ketik nama kampus (min. 5 huruf)..."
              : "Ketik nama sekolah (min. 5 huruf)..."
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-10 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </div>
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl shadow-black/40 max-h-60 overflow-y-auto">
          {inputValue.length < 5 ? (
            <div className="px-4 py-3 text-center">
              <p className="text-xs text-slate-500 italic">
                Ketik min. 5 huruf untuk mencari{" "}
                {type === "university" ? "kampus" : "sekolah"}...
              </p>
            </div>
          ) : isLoading ? (
            <div className="p-3 space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-9 bg-slate-700/40 animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : results.length > 0 ? (
            <ul className="py-1">
              {results.map((name, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => handleSelect(name)}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-blue-600/20 hover:text-white transition-colors"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          ) : hasSearched ? (
            <div className="px-4 py-3 text-center">
              <p className="text-xs text-slate-500">
                Tidak ditemukan. Kamu bisa lanjut ketik manual.
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
