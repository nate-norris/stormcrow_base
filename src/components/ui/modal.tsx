import { createPortal } from "react-dom";
import FocusLock from "react-focus-lock";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiArrowLeft } from "react-icons/fi";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ isOpen, onClose, children }: ModalProps) {

  if (!isOpen) {
    return createPortal(
      <AnimatePresence />,
      document.body
    );
  }

  return createPortal(
    <AnimatePresence>
      <FocusLock>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onMouseDown={() => onClose()}
        >
          <motion.div
            className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            onMouseDown={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black transition-all hover:scale-120"
              onClick={() => onClose()}>
              <FiX size={20} className="stroke-[3.5]" />
            </button>
            {children}
          </motion.div>
        </div>
      </FocusLock>
    </AnimatePresence>,
    document.body
  );
}

type BackProps = {
  action: () => void;
};
function ModalBackButton({ action=() => {} }: BackProps) {

  return (
    <button 
        className="absolute top-3 left-3 flex items-center gap-1 
        text-gray-500 hover:text-black transition-colors hover:scale-120"
        onClick={action}
    >
        <FiArrowLeft size={20} className="stroke-[3.5]" />
    </button>
  );
}

export {
  Modal,
  ModalBackButton,
}