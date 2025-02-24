export type Confetti = {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
};

export const ConfettiPiece = ({ x, y, color, angle }: Confetti) => (
  <div
    className="absolute pointer-events-none animate-confetti"
    style={{
      left: x,
      top: y,
      backgroundColor: color,
      transform: `rotate(${angle}deg)`,
    }}
  />
);
