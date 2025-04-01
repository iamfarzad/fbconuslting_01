import React from 'react';

interface VoiceUIProps {
  isListening?: boolean;
  onStart?: () => void;
  onStop?: () => void;
  onCommand?: (command: string) => void;
  noFloatingButton?: boolean;
}

const VoiceUI: React.FC<VoiceUIProps> = ({ 
  isListening = false, 
  onStart, 
  onStop,
  onCommand,
  noFloatingButton = false
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={isListening ? onStop : onStart}
        className={`p-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-blue-500'} text-white`}
      >
        {isListening ? 'Stop' : 'Start'} Listening
      </button>
      {isListening && <div className="text-sm text-red-500">Listening...</div>}
    </div>
  );
};

export default VoiceUI;
