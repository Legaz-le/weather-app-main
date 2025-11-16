"use client";

import { useState } from "react";

export function useGeolocation() {
  const [location, setLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
       (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude })
      },
      (err) => setError(err.message)
    );
  };

  return { location, error, getLocation };
}
