interface ImageBlockData {
  url: string;
  caption?: string;
  withBorder?: boolean;
  withBackground?: boolean;
  stretched?: boolean;
}

interface ImageToolConfig {
  uploader?: {
    uploadByFile(file: File): Promise<{ success: number; file: { url: string } }>;
    uploadByUrl(url: string): Promise<{ success: number; file: { url: string } }>;
  };
  /**
   * Допустимые типы файлов, например, 'image/*'
   */
  acceptedFileTypes?: string;
  /**
   * Максимальный размер файла, например, 5*1024*1024
   */
  limitFileSize?: number;
}

interface ImageBlock {
  new (data: ImageBlockData, config: ImageToolConfig): {
    render(): HTMLElement;
    save(): ImageBlockData;
    validate(savedData: ImageBlockData): boolean;
  };
}

interface LinkBlockData {
  link: string;
  meta?: {
    title?: string;
    description?: string;
    image?: {
      url?: string;
      width?: number;
      height?: number;
    };
  };
}

interface LinkToolConfig {
  endpoint: string;
  additionalRequestHeaders?: Record<string, string>;
  /**
   * Конструктор для создания объекта, содержащего мета-данные
   */
  metaGenerator?(url: string): Promise<{
    title?: string;
    description?: string;
    image?: {
      url?: string;
      width?: number;
      height?: number;
    };
  }>;
}

interface LinkBlock {
  new (data: LinkBlockData, config: LinkToolConfig): {
    render(): HTMLElement;
    save(): LinkBlockData;
    validate(savedData: LinkBlockData): boolean;
    handleLinkPaste(url: string): Promise<void>;
    fetchMeta(url: string): Promise<void>;
  };
}
