import { useEffect, useState } from "react";

export const useBannerTimer = () => {
  const TIME = 5 * 60 * 1000;
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const validateOrCreateExpiry = () => {
      const existing = localStorage.getItem("banner_expire");

      if (!existing) {
        const expireAt = Date.now() + TIME;
        localStorage.setItem("banner_expire", expireAt);
        return expireAt;
      }

      const existingNum = parseInt(existing, 10);

      if (existingNum <= Date.now()) {
        const expireAt = Date.now() + TIME;
        localStorage.setItem("banner_expire", expireAt);
        return expireAt;
      }

      return existingNum;
    };

    let expireAt = validateOrCreateExpiry();

    const timer = setInterval(() => {
      if (expireAt <= Date.now()) {
        expireAt = Date.now() + TIME;
        localStorage.setItem("banner_expire", expireAt);
      }
      setTimeLeft(Math.floor((expireAt - Date.now()) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [TIME]);

  return timeLeft;
};
