import React from 'react';

export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string;
  filename?: string;
  mimeType?: string;
}

interface DocumentPreviewProps {
  documents: UploadedDocument[];
  onRemove?: (id: string) => void;
}

interface DocumentIconProps {
  mimeType?: string;
}

// Simple DocumentIcon component
const DocumentIcon: React.FC<DocumentIconProps> = ({ mimeType = 'text/plain' }) => {
  const getIconByType = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('word') || type.includes('doc')) return '📝';
    if (type.includes('excel') || type.includes('sheet')) return '📊';
    if (type.includes('json')) return '{ }';
    if (type.includes('text')) return '📄';
    return '📁';
  };

  return <span className="text-2xl">{getIconByType(mimeType)}</span>;
};

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ 
  documents, 
  onRemove 
}) => {
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (documents.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-2">
      <h3 className="text-sm font-medium">Uploaded Documents</h3>
      <div className="space-y-2">
        {documents.map((doc) => (
          <div 
            key={doc.id} 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md border"
          >
            <div className="flex items-center space-x-3">
              <DocumentIcon mimeType={doc.mimeType || doc.type} />
              <div>
                <p className="text-sm font-medium">{doc.filename || doc.name}</p>
                <p className="text-xs text-gray-500">{formatBytes(doc.size)}</p>
              </div>
            </div>
            {onRemove && (
              <button 
                onClick={() => onRemove(doc.id)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Remove document"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
