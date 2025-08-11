import { createContext, Dispatch, SetStateAction } from "react";

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
  setFileList_: Dispatch<SetStateAction<FileItem[]>>;
}

export const FileListContext = createContext<FileListContextType | undefined>(undefined);