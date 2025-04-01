import React from 'react';
import { AnimatedBars } from '../ui/AnimatedBars';
import { Button } from '../ui/button';
import { VoiceUIProps } from '@/types/voice';

export const VoicePanel: React.FC<VoiceUIProps> = ({
  isListening,
  onStart,
  onStop,
  transcript,
  isTranscribing,
  error
}) => {
  return (
    <div className="flex flex-col space-y-4 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <Button
          onClick={isListening ? onStop : onStart}
          variant={isListening ? 'primary' : 'default'}
        >
          {isListening ? 'Stop' : 'Start'} Listening
        </Button>
        {isListening && <AnimatedBars />}
      </div>
      
      {transcript && (
        <div className="text-sm text-gray-600">
          {isTranscribing ? 'Transcribing...' : transcript}
        </div>
      )}
      
      {error && (
        <div className="text-sm text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};
