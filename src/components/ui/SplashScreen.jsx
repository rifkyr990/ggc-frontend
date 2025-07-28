import { motion } from "framer-motion";
import { useEffect } from "react";

export default function SplashScreen({ onFinish }) {
    useEffect(() => {
        const timer = setTimeout(() => {
        onFinish();
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
        }}
        >
        <motion.img
            src="/image/logo3.png"
            alt="Logo"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="w-4/5 max-w-xs h-auto"
        />

        </motion.div>
    );
}
