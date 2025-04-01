import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
// We'll handle the date-fns import differently
import { trackEvent } from '@/services/analyticsService';
import { CalendarDays, Clock, Check } from 'lucide-react';

// Define simple date utility functions to replace date-fns
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const startOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

interface BookingCalendarProps {
  onBookingConfirmed: (date: Date, time: string) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onBookingConfirmed }) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const today = startOfDay(new Date());
  const oneMonthFromNow = addDays(today, 30);
  
  const availableTimes = [
    "09:00 AM", "10:00 AM", "11:00 AM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];
  
  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined); // Reset time when date changes
  };
  
  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Booking Error",
        description: "Please select both a date and time for your consultation.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Track the booking event
    trackEvent({
      action: 'book',
      category: 'consultation',
      label: 'calendar_booking',
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime
    });
    
    // Simulate API call to book appointment
    setTimeout(() => {
      toast({
        title: "Booking Confirmed!",
        description: `Your consultation is scheduled for ${formatDate(selectedDate)} at ${selectedTime}`,
        variant: "default"
      });
      
      onBookingConfirmed(selectedDate, selectedTime);
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-primary" />
              Select a Date
            </h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSelectDate}
              disabled={(date) => date < today || date > oneMonthFromNow}
              className="rounded-md border"
            />
          </div>
          
          {selectedDate && (
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                Select a Time
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={selectedTime === time ? "border-primary" : ""}
                    onClick={() => handleSelectTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {selectedDate && selectedTime && (
            <div className="pt-4">
              <Button 
                className="w-full"
                disabled={isSubmitting}
                onClick={handleConfirmBooking}
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Confirm Booking
                  </>
                )}
              </Button>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                You'll receive a confirmation email with meeting details
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
