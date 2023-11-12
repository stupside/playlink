import { FC, useState, useEffect } from "react";

const ONE_SEC_IN_MS = 1000;

const Timer: FC<{ expiry?: number }> = ({ expiry = 0 }) => {
  const [remaining, setRemaining] = useState<number>(expiry);

  useEffect(() => {
    setRemaining(expiry);
  }, [expiry]);

  useEffect(() => {
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
    <p className="font-bold">{remaining} sec</p>
  ) : (
    <p className="font-bold">Expired</p>
  );
};

export default Timer;
