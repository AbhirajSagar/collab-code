'use client';
import { motion, AnimatePresence, spring } from "framer-motion";

export default function AnimatedModal({ isOpen, onClose, children, className }) 
{
    return (
        <AnimatePresence>
            {isOpen && (
                <div className='w-full h-full backdrop-blur-sm flex justify-center items-center fixed top-0 left-0 z-50' onClick={onClose}>
                    <motion.div initial={{scale: 0, translateY: '-100vh'}} animate={{scale: 1, translateY: '0vh'}} exit={{scale: 0, translateY: '100vh'}} transition={{ type: "spring", stiffness: 300, damping: 20 }} className={`${className} w-1/3 min-w-[280px] min-h-80 rounded-lg outline-1 outline-amber-600 bg-background-muted-dark`} onClick={(e) => e.stopPropagation()}>
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
