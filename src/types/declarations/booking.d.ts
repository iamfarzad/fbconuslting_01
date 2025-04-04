declare interface BookingSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
  duration: number;
}

declare interface BookingRequest {
  slotId: string;
  name: string;
  email: string;
  company?: string;
  message?: string;
}

declare interface BookingConfirmation {
  id: string;
  slot: BookingSlot;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}
