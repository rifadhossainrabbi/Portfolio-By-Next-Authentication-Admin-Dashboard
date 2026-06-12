'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Background Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-[#0a101f] border border-red-500/30 w-full max-w-md rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(239,68,68,0.2)] overflow-hidden"
        >
          {/* Cyberpunk Decorative Corner */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 -rotate-45 translate-x-10 -translate-y-10" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
          >
            <FiX size={20} />
          </button>

          <div className="flex flex-col items-center text-center space-y-6">
            {/* Warning Icon with Glow */}
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
              <FiAlertTriangle
                className="text-red-500 animate-pulse"
                size={40}
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                Confirm <span className="text-red-500">Purge</span>
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed uppercase tracking-widest font-medium">
                Are you sure you want to delete: <br />
                <span className="text-white font-black mt-2 inline-block">
                  "{itemName}"
                </span>
              </p>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

            {/* Action Buttons */}
            <div className="flex flex-col w-full gap-3">
              <button
                onClick={onConfirm}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl uppercase tracking-[0.2em] text-[10px] transition-all shadow-[0_10px_20px_rgba(220,38,38,0.2)] active:scale-95"
              >
                Permanently Delete 
              </button>
              <button
                onClick={onClose}
                className="w-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-black py-4 rounded-2xl uppercase tracking-[0.2em] text-[10px] transition-all border border-white/5"
              >
                Back
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DeleteModal;
