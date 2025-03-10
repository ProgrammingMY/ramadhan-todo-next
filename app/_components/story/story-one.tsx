/**
 * Introduction story
 * Greet the user
 * The recap of the user's deeds for the past week
 */


import { useUser } from "@/_context/user-context";
import { motion } from "motion/react";

export default function StoryOne() {
    const { user } = useUser();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                background: 'linear-gradient(135deg, #289672, #4ECDC4)',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                padding: '20px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <motion.div
                className="profile-picture"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '4px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    marginBottom: '30px',
                }}
            >
                <img
                    src={user?.picture || '/default-avatar.png'}
                    alt="Profile"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                style={{
                    fontSize: '32px',
                    marginBottom: '20px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                }}
            >
                Assalamu'alaikum, {user?.username || ''} 👋
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                style={{
                    fontSize: '24px',
                    textAlign: 'center',
                    maxWidth: '80%',
                    lineHeight: 1.4,
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
                }}
            >
                Let's recap your deeds for the past week
            </motion.p>

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
                transition={{ delay: 1.6, duration: 0.4 }}
            >
                <p style={{ fontSize: '16px', opacity: 0.8 }}>
                    Swipe to continue →
                </p>
            </motion.div>
        </motion.div>
    );
}