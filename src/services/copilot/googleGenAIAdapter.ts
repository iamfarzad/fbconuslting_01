import API_CONFIG from '@/config/apiConfig';

export interface GoogleGenAIConfig {
  apiKey: string;
  modelName?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

export async function testGoogleGenAIConnection(config: GoogleGenAIConfig): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_CONFIG.gemini.baseUrl}/${API_CONFIG.gemini.version}/models`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
        },
      }
    );
    
    if (response.ok) {
      return true;
    } else {
      console.error('Failed to connect to Google Generative AI:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('Error testing Google Generative AI connection:', error);
    return false;
  }
}

export async function generateResponse(prompt: string, apiKey = API_CONFIG.gemini.apiKey) {
  try {
    const response = await fetch(
      `${API_CONFIG.gemini.baseUrl}/${API_CONFIG.gemini.version}/models/${API_CONFIG.gemini.model}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}
