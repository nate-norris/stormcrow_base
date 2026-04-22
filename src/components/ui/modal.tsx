import { createPortal } from "react-dom";
import FocusLock from "react-focus-lock";
import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
  isOpen: boolean;
  setIsOpen?: (value: boolean) => void;
  children: React.ReactNode;
};

export function Modal({ isOpen, setIsOpen=() => {}, children }: ModalProps) {

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
          onMouseDown={() => setIsOpen(false)}
        >
          <motion.div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            onMouseDown={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <button
              className="absolute top-2 right-2"
              onClick={() => setIsOpen(false)}>
              X
            </button>
            {children}
          </motion.div>
        </div>
      </FocusLock>
    </AnimatePresence>,
    document.body
  );
}