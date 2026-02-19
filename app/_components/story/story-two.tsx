/**
 * Total tasks completed in the past week
 */
import {
    motion,
    KeyframeOptions,
    animate,
    useInView,
    useIsomorphicLayoutEffect,
} from "motion/react";
import { useRef } from "react";

// comment based on tasks completed
const COMMENT = [
    {
        tasksCompleted: 50,
        comment: "MashaAllah! 50+ sunnah acts completed! Your dedication to following the Sunnah is truly commendable."
    },
    {
        tasksCompleted: 40,
        comment: "Alhamdulillah for your 40+ sunnah acts! Following the Prophet's way brings light to your path. ✨ ."
    },
    {
        tasksCompleted: 30,
        comment: "SubhanAllah! 30+ sunnah practices this week. May Allah reward you for your efforts."
    },
    {
        tasksCompleted: 20,
        comment: "BarakAllahu feek! Your 20+ sunnah acts are seeds of barakah in your daily life. 🌱"
    },
    {
        tasksCompleted: 10,
        comment: "JazakAllah khair for your 10+ sunnah practices! Remember, small consistent efforts are highly rewarded."
    },
    {
        tasksCompleted: 5,
        comment: "Alhamdulillah for your 5+ sunnah acts! May Allah ease your journey."
    },
    {
        tasksCompleted: 0,
        comment: "The journey of following the sunnah begins with intention. May Allah make it easy for you."
    }
];

// AnimatedCounter component
const AnimatedCounter = ({
    from,
    to,
    animationOptions,
    style,
}: {
    from: number;
    to: number;
    animationOptions?: KeyframeOptions;
    style?: React.CSSProperties;
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useIsomorphicLayoutEffect(() => {
        const element = ref.current;

        if (!element) return;
        if (!inView) return;

        // Set initial value
        element.textContent = String(from);

        // If reduced motion is enabled in system's preferences
        if (window.matchMedia("(prefers-reduced-motion)").matches) {
            element.textContent = String(to);
            return;
        }

        const controls = animate(from, to, {
            duration: 2, // Match the 2 second duration used elsewhere
            ease: "easeOut",
            ...animationOptions,
            onUpdate(value) {
                element.textContent = value.toFixed(0);
            },
        });

        // Cancel on unmount
        return () => {
            controls.stop();
        };
    }, [ref, inView, from, to, animationOptions]);

    return <span ref={ref} style={style} />;
};



export default function StoryTwo({ rank, completedTasks }: { rank?: number, completedTasks: number }) {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
            {/* Background animated dots */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: 0.1
                }}
            >
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: 'absolute',
                            background: 'white',
                            borderRadius: '50%',
                            width: Math.random() * 10 + 5,
                            height: Math.random() * 10 + 5,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: Math.random() * 2 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </motion.div>

            {/* Main content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    textAlign: 'center',
                    zIndex: 1
                }}
            >
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    style={{
                        fontSize: '24px',
                        marginBottom: '20px',
                        fontWeight: '500'
                    }}
                >
                    This week, you completed
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0, duration: 0.5 }}
                    style={{
                        fontSize: '120px',
                        fontWeight: 'bold',
                        lineHeight: '1',
                        marginBottom: '20px',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    {/* Use the AnimatedCounter component */}
                    <AnimatedCounter
                        from={0}
                        to={completedTasks}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                    style={{
                        fontSize: '32px',
                        fontWeight: '600',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    sunnah
                </motion.div>
            </motion.div>

            {/* Bottom text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
                style={{
                    textAlign: 'center',
                    position: 'absolute',
                    bottom: '60px',
                    fontSize: '18px',
                    opacity: 1.0,
                    padding: '0 20px'
                }}
            >
                {rank && (
                    <>
                        You are ranked <span style={{ fontWeight: 'bold' }}>{rank}</span> among our users this week!
                    </>
                )}
            </motion.p>
        </motion.div>
    );
}