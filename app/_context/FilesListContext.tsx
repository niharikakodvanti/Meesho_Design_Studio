import { createContext } from "react";

export interface FileItem {
  _id: string;
  fileName: string;
  teamId: string;
  createdBy: string;
  archive: boolean;
  document: string;
  whiteboard: string;
}

interface FileListContextType {
  fileList_: FileItem[];
  setFileList_: (files: FileItem[]) => void;
}

export const FileListContext = createContext<FileListContextType | undefined>(undefined);