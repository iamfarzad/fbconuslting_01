import { useState, useEffect } from "react";

interface LocationData {
  country: string;
  city: string;
  isLoading: boolean;
  error: string | null;
}

export const useLocationDetection = () => {
  const [locationData, setLocationData] = useState<LocationData>({
    country: "",
    city: "",
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // In a real implementation, this would call a geolocation API
        // For now, just simulate a delay and return default data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setLocationData({
          country: "Norway",
          city: "Oslo",
          isLoading: false,
          error: null
        });
      } catch (error) {
        setLocationData(prev => ({
          ...prev,
          isLoading: false,
          error: "Failed to detect location"
        }));
      }
    };
    
    detectLocation();
  }, []);

  return locationData;
};
