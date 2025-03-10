/**
 * Closing story
 * Thank the user for using the app
 * Encourage the user to continue
 * Ask the user to rate the app
 * Ask the user to share the app with their friends
 */

import { useUser } from "@/_context/user-context";
import { motion } from "motion/react";
import { Bell, Share2, Heart } from "lucide-react";

export default function StorySix() {
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
                        Your commitment to self-improvement is inspiring
                    </motion.p>
                </motion.div>

                {/* Call-to-Action Cards */}
                <motion.div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        width: '100%'
                    }}
                >
                    {/* Notifications Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '15px',
                            padding: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            cursor: 'pointer',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Bell size={24} color="white" />
                        <div>
                            <h3 style={{ color: 'white', fontWeight: '500' }}>Stay Updated</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                                Turn on notifications for daily motivation
                            </p>
                        </div>
                    </motion.div>

                    {/* Share Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '15px',
                            padding: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            cursor: 'pointer',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Share2 size={24} color="white" />
                        <div>
                            <h3 style={{ color: 'white', fontWeight: '500' }}>Share With Friends</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                                Help others discover their potential
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Inspirational Quote */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    style={{
                        fontSize: '16px',
                        color: 'white',
                        textAlign: 'center',
                        fontStyle: 'italic',
                        opacity: 0.9,
                        marginTop: '20px'
                    }}
                >
                    "Every small step you take brings you closer to your goals"
                </motion.p>
            </motion.div>

            {/* Bottom Message */}
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.4 }}
            >
                <p style={{
                    fontSize: '16px',
                    color: 'white',
                    opacity: 0.8
                }}>
                    See you tomorrow! ✨
                </p>
            </motion.div>
        </motion.div>
    );
}