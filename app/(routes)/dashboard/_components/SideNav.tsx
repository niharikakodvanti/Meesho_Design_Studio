import { ChevronDown } from 'lucide-react';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import SideNavTopSection, { TEAM } from './SideNavTopSection';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import SideNavBottomSection from './SideNavBottomSection';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FileListContext, FileItem } from '@/app/_context/FilesListContext';

function SideNav() {
  const { user } = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam] = useState<TEAM | undefined>();
  const convex = useConvex();
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fileList_, setFileList_ } = useContext(FileListContext) || { fileList_: [], setFileList_: () => {} };

  const getFiles = useCallback(async () => {
    if (!activeTeam?._id) {
      console.warn('No team selected. Cannot fetch files.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await convex.query(api.files.getFiles, {
        teamId: activeTeam._id
      });
      
      if (Array.isArray(result)) {
        setFileList_(result as FileItem[]);
        setTotalFiles(result.length);
      } else {
        console.error('Unexpected result format from getFiles query');
        setFileList_([]);
        setTotalFiles(0);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
      toast('Error fetching files');
      setFileList_([]);
      setTotalFiles(0);
    } finally {
      setIsLoading(false);
    }
  }, [activeTeam?._id, convex, setFileList_]);

  useEffect(() => {
    if (activeTeam?._id) {
      getFiles();
    }
  }, [activeTeam?._id, getFiles]);

  const onFileCreate = async (fileName: string) => {
    if (!activeTeam?._id) {
      toast.error('No team selected. Please select a team first.');
      return;
    }

    if (!user?.email) {
      toast.error('User not logged in. Please log in to create files.');
      return;
    }

    if (!fileName || fileName.trim().length < 3) {
      toast.error('File name must be at least 3 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await createFile({
        fileName: fileName.trim(),
        teamId: activeTeam._id,
        createdBy: user.email,
        archive: false,
        document: '',
        whiteboard: ''
      });

      if (result) {
        await getFiles(); // Refresh the file list
        toast.success('File created successfully!');
      } else {
        toast.error('Failed to create file');
      }
    } catch (error) {
      console.error('Error creating file:', error);
      toast.error('Error while creating file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen fixed w-72 border-r border-[1px] p-6 flex flex-col">
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(team: TEAM) => setActiveTeam(team)}
        />
      </div>
      <div>
        <SideNavBottomSection
          totalFiles={totalFiles}
          onFileCreate={onFileCreate}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default SideNav;
