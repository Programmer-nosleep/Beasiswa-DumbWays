declare module "multer" {
  import type { RequestHandler } from "express";

  export type File = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
  };

  export type FileFilterCallback = (error: any, acceptFile?: boolean) => void;

  export type DiskStorageOptions = {
    destination:
      | string
      | ((req: any, file: File, cb: (error: any, destination: string) => void) => void);
    filename?: (req: any, file: File, cb: (error: any, filename: string) => void) => void;
  };

  export type Options = {
    storage?: any;
    limits?: { fileSize?: number };
    fileFilter?: (req: any, file: File, cb: FileFilterCallback) => void;
  };

  export type Multer = {
    single(fieldName: string): RequestHandler;
  };

  function multer(options?: Options): Multer;

  namespace multer {
    class MulterError extends Error {
      code: string;
      field?: string;
    }

    function diskStorage(options: DiskStorageOptions): any;
  }

  export default multer;
}
