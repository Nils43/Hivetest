"use client";

interface StarRatingProps {
  stars: number;
  feedback: string;
  onContinue: () => void;
  isLastTask?: boolean;
}

export default function StarRating({
  stars,
  feedback,
  onContinue,
  isLastTask,
}: StarRatingProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-bg-secondary rounded-2xl p-8 max-w-md w-full text-center animate-slide-up">
        <div className="flex justify-center gap-3 mb-6">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className="text-5xl animate-star-pop"
              style={{ animationDelay: `${i * 0.2}s`, opacity: 0 }}
            >
              {i <= stars ? "⭐" : "☆"}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-2">
          {stars === 3
            ? "Hervorragend!"
            : stars === 2
              ? "Gut gemacht!"
              : "Das geht noch besser!"}
        </h3>

        <p className="text-text-secondary mb-6 text-sm leading-relaxed">
          {feedback}
        </p>

        <button
          onClick={onContinue}
          className="w-full py-3 rounded-xl font-semibold text-white bg-accent-purple hover:brightness-110 transition-all"
        >
          {isLastTask ? "Szenario abschließen" : "Weiter zur nächsten Aufgabe"}
        </button>
      </div>
    </div>
  );
}
