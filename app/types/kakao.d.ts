interface Kakao {
  init: (appKey: string) => void;
  Share: {
    sendCustom: (settings: {
      templateId: number;
      templateArgs?: Record<string, string>;
      installTalk?: boolean;
      serverCallbackArgs?: Record<string, string> | string;
    }) => void;

    uploadImage: (settings: { file: FileList }) => Promise<{
      infos: {
        original: {
          content_type: string;
          url: string;
          length: number;
          width: number;
          height: number;
        };
      };
    }>;
  };
}

declare global {
  interface Window {
    Kakao: Kakao;
  }
}

export {};
