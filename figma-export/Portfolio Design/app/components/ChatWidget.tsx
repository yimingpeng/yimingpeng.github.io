import { useState } from "react";
import { MessageSquare, X } from "lucide-react";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-[#2563eb] dark:bg-[#89b4fa] text-white dark:text-[#1e1e2e] px-5 py-3 rounded-full shadow-lg hover:scale-105 transition-transform z-40"
        aria-label="Open AI Chat"
      >
        <MessageSquare size={18} />
        <span className="font-bold text-sm tracking-tight">Ask Yiming</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20 dark:bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-[360px] bg-white dark:bg-[#1e1e2e] border border-[#e5e7eb] dark:border-[#313244] rounded-xl p-6 shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-[#cdd6f4] transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-[#cdd6f4] mb-3">
              Ask me anything
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-[#bac2de] leading-relaxed mb-6">
              Coming soon — I'm building an AI assistant that knows my work, projects, and experience.
            </p>
            
            <div>
              <a 
                href="mailto:hello@example.com" 
                className="text-sm text-[#2563eb] dark:text-[#89b4fa] hover:underline"
              >
                hello@example.com
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
