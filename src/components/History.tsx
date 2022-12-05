import { HistoryHabit } from "../App";

type HistoryProps = {
  history: HistoryHabit[][];
};

export default function History({ history }: HistoryProps) {
  const boxLength = 15;

  return (
    <div className="flex flex-col items-center">
      {/* TODO: Don't use SVG */}
      <svg width="300" height="275">
        {history.map((elt, idx) => {
          if (elt.length == 0) {
            return (
              <rect
                width={boxLength}
                height={boxLength}
                x={(idx % 12) * 25 + 5}
                y={Math.floor(idx / 12) * 25}
                fill="#808080"
              />
            );
          }
          // TODO: Look into why this from is necessary
          return Array.from(elt).map((elt2, idx2, list) => {
            return (
              <rect
                width={boxLength}
                height={boxLength / list.length}
                x={(idx % 12) * 25 + 5}
                y={Math.floor(idx / 12) * 25 + (idx2 * boxLength) / list.length}
                fill={elt2.color}
              />
            );
          });
        })}
      </svg>
    </div>
  );
}
