"use client";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading.client";

export default function ClientLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const hideLoader = () => {
      setIsLoading(false);
      timeoutId = setTimeout(() => setIsVisible(false), 300);
    };

    // Start the loader
    const startLoader = () => {
      const minDisplayTime = 600;

      const minTimeout = new Promise((resolve) => setTimeout(resolve, minDisplayTime));

      const windowLoadPromise = new Promise((resolve) => {
        if (document.readyState === "complete") {
          resolve(null); 
        } else {
          window.addEventListener("load", resolve);
        }
      });

      Promise.all([minTimeout, windowLoadPromise]).then(() => {
        hideLoader();
      });
    };

    startLoader();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {isVisible && <Loading className={isLoading ? "opacity-100" : "opacity-0 transition-opacity duration-300"} />}
      {!isLoading && children}
    </>
  );
}