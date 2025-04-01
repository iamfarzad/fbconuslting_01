export enum ChatServiceType {
  GEMINI = 'gemini',
  GPT = 'gpt',
  CLAUDE = 'claude',
  MOCK = 'mock'
}

export class ChatFactory {
  static createChatService(type: ChatServiceType, config: any) {
    switch (type) {
      case ChatServiceType.GEMINI:
        return { type: 'gemini', config };
      case ChatServiceType.MOCK:
        return { type: 'mock', config };
      default:
        throw new Error(`Unsupported chat service type: ${type}`);
    }
  }
}
