import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

interface LocationGreetingProps {
  className?: string;
}

const LocationGreeting: React.FC<LocationGreetingProps> = ({ className }) => {
  const [locationData, setLocationData] = useState<{
    city?: string;
    country?: string;
    timezone?: string;
    greeting?: string;
  }>({});

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Use a geolocation API (e.g. ipinfo.io, ipapi.co)
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // Get time-appropriate greeting
        const hour = new Date().getHours();
        let greeting = 'Hello';
        
        if (hour < 12) greeting = 'Good morning';
        else if (hour < 18) greeting = 'Good afternoon';
        else greeting = 'Good evening';
        
        setLocationData({
          city: data.city,
          country: data.country_name,
          timezone: data.timezone,
          greeting
        });
      } catch (error) {
        console.error('Error fetching location data:', error);
        setLocationData({
          greeting: 'Hello'
        });
      }
    };
    
    fetchLocation();
  }, []);

  if (!locationData.city) {
    return <div className={className}>Welcome to Farzad Bayat Consulting</div>;
  }

  return (
    <div className={`flex items-center justify-center gap-1.5 ${className}`}>
      <MapPin className="w-3 h-3" />
      <span>
        {locationData.greeting} from {locationData.city}, {locationData.country}
      </span>
    </div>
  );
};

export default LocationGreeting;
