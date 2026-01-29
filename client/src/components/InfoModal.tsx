import React from "react";

interface InfoModalProps {
  open: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-[#fff9f2]/90 dark:bg-slate-900/90 
                      p-7 rounded-3xl shadow-2xl border 
                      border-amber-400/40 dark:border-slate-700 
                      w-11/12 max-w-lg animate-scaleIn">

        <h2 className="text-3xl font-bold text-amber-800 dark:text-amber-200 mb-5">
          How to Use <span className="text-amber-500">CopyIt</span>
        </h2>

        <ol className="list-decimal list-inside space-y-4 text-amber-800 dark:text-amber-300 leading-relaxed text-lg">
          <li>Enter or paste your text into the editor.</li>
          <li>Click <strong>Create</strong> to generate your unique token.</li>
          <li>Share this token with anyone you want to collaborate with.</li>
          <li>They paste the token and click <strong>Receive</strong>.</li>
          <li>Edit together in real-time — simple & seamless.</li>
        </ol>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-amber-600 hover:bg-amber-700 
                     text-white py-3 rounded-xl font-semibold 
                     shadow-md transition-all"
        >
          Got It!
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
