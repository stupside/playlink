import { type FC, useState, useEffect } from "react";

const ONE_SEC_IN_MS = 1000;

const Timer: FC<{ expiry?: number }> = ({ expiry }) => {
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    setRemaining(expiry ?? 0);
  }, [expiry]);

  useEffect(() => {
    if (!expiry) return;

    const interval = setInterval(() => {
      setRemaining((old) => {
        const remaining = old - 1;

        if (remaining) return remaining;

        return 0;
      });
    }, ONE_SEC_IN_MS);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, expiry * ONE_SEC_IN_MS);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [expiry]);

  return remaining ? (
    <p className="font-bold text-lg">
      Expiring in <span className="font-mono">{remaining}</span> sec
    </p>
  ) : (
    <p className="font-bold text-lg">Expired</p>
  );
};

export default Timer;
