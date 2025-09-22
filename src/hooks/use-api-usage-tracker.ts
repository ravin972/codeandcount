
"use client";

import { useState, useEffect, useCallback } from 'react';

const DAILY_LIMIT = 100; // Example daily limit

interface UsageData {
  count: number;
  resetTimestamp: number;
}

export function useApiUsageTracker(trackerId: string) {
  const [usage, setUsage] = useState<UsageData>({ count: 0, resetTimestamp: 0 });
  const [timeUntilReset, setTimeUntilReset] = useState('');

  const getStorageKey = () => `apiUsageTracker_${trackerId}`;

  // Function to load usage from localStorage
  const loadUsage = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      const storedData = localStorage.getItem(getStorageKey());
      const now = Date.now();

      if (storedData) {
        const parsedData: UsageData = JSON.parse(storedData);
        // Check if the reset time has passed
        if (now >= parsedData.resetTimestamp) {
          // If so, reset the counter
          const newResetTimestamp = new Date().setHours(24, 0, 0, 0); // Next midnight
          const newUsage = { count: 0, resetTimestamp: newResetTimestamp };
          localStorage.setItem(getStorageKey(), JSON.stringify(newUsage));
          setUsage(newUsage);
        } else {
          setUsage(parsedData);
        }
      } else {
        // Initialize if no data exists
        const newResetTimestamp = new Date().setHours(24, 0, 0, 0);
        const initialUsage = { count: 0, resetTimestamp: newResetTimestamp };
        localStorage.setItem(getStorageKey(), JSON.stringify(initialUsage));
        setUsage(initialUsage);
      }
    } catch (error) {
      console.error("Failed to load or parse API usage data from localStorage:", error);
      // Fallback to a safe default
      const newResetTimestamp = new Date().setHours(24, 0, 0, 0);
      setUsage({ count: 0, resetTimestamp: newResetTimestamp });
    }
  }, [trackerId]);

  // Load usage on initial mount
  useEffect(() => {
    loadUsage();
  }, [loadUsage]);

  // Function to increment the usage count
  const incrementUsage = () => {
    setUsage(currentUsage => {
      const newCount = currentUsage.count + 1;
      const newUsage = { ...currentUsage, count: newCount };
      if (typeof window !== 'undefined') {
        localStorage.setItem(getStorageKey(), JSON.stringify(newUsage));
      }
      return newUsage;
    });
  };

  // Effect to update the time-until-reset display
  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const remaining = usage.resetTimestamp - now;

      if (remaining <= 0) {
        setTimeUntilReset("00:00:00");
        loadUsage(); // Reload to reset the count
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeUntilReset(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    };

    if (usage.resetTimestamp > 0) {
      updateTimer(); // Initial update
      const intervalId = setInterval(updateTimer, 1000);
      return () => clearInterval(intervalId);
    }
  }, [usage.resetTimestamp, loadUsage]);
  
  return { usage, incrementUsage, timeUntilReset, DAILY_LIMIT };
}

    