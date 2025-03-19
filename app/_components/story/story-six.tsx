/**
 * Closing story
 * Thank the user for using the app
 * Encourage the user to continue
 * Ask the user to rate the app
 * Ask the user to share the app with their friends
 */

import { useUser } from "@/_context/user-context";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

export default function StorySix({ analysisText, rank }: { analysisText?: string, rank?: number }) {
    const { user } = useUser();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                background: 'linear-gradient(135deg, #00B4DB, #0083B0)',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Floating Hearts Background */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        scale: 0,
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        y: [0, -100, -200]
                    }}
                    transition={{
                        duration: 3,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 2
                    }}
                    style={{
                        position: 'absolute',
                        color: 'white',
                        opacity: 0.3
                    }}
                >
                    <Heart size={16} />
                </motion.div>
            ))}

            {/* Main Content Container */}
            <motion.div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '30px',
                    maxWidth: '300px',
                    zIndex: 1
                }}
            >
                {/* Thank You Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        textAlign: 'center'
                    }}
                >
                    <motion.h2
                        style={{
                            fontSize: '32px',
                            color: 'white',
                            fontWeight: 'bold',
                            marginBottom: '15px',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        Thank You, {user?.username || 'Friend'}! 🎉
                    </motion.h2>
                    <motion.p
                        style={{
                            fontSize: '18px',
                            color: 'white',
                            opacity: 0.9
                        }}
                    >
                        {analysisText || "May Allah reward you for your efforts. Keep up the good work!"}
                    </motion.p>
                </motion.div>

                {/* Weekly Rank Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '15px',
                        padding: '25px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '50%',
                            width: '80px',
                            height: '80px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '15px',
                            border: '2px solid rgba(255, 255, 255, 0.5)'
                        }}
                    >
                        <h1 style={{
                            fontSize: '36px',
                            color: 'white',
                            fontWeight: 'bold',
                            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)'
                        }}>
                            {rank || '-'}
                        </h1>
                    </motion.div>
                    <h3 style={{
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '20px',
                        marginBottom: '5px'
                    }}>
                        Your Weekly Rank
                    </h3>
                    <p style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '16px',
                        textAlign: 'center'
                    }}>
                        {rank ?
                            `You ranked #${rank} this week. Amazing progress!` :
                            "Keep completing tasks to earn your rank!"}
                    </p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}