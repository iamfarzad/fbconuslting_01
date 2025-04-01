import { useState } from "react";

export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string;
}

export const useDocumentUpload = () => {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  
  const uploadDocument = async (file: File): Promise<UploadedDocument> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const doc: UploadedDocument = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type,
          size: file.size,
          content
        };
        
        setDocuments(prev => [...prev, doc]);
        resolve(doc);
      };
      
      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };
      
      reader.readAsText(file);
    });
  };
  
  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };
  
  return {
    documents,
    uploadDocument,
    removeDocument
  };
};

export default useDocumentUpload;
