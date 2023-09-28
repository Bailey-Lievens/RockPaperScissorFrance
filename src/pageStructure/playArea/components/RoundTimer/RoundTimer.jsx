export default function RoundTimer({ roundState }) {
  return (
    <div className="round-timer">
      <div className="countdown-number">{roundState.countdown}</div>
    </div>
  );
}
