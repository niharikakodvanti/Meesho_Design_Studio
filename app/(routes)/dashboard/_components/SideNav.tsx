import { Archive, ChevronDown, Flag, Github } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import SideNavTopSection, { TEAM } from './SideNavTopSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import SideNavBottomSection from './SideNavBottomSection'
import { useConvex, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { FileListContext } from '@/app/_context/FilesListContext'
import { Id } from '@/convex/_generated/dataModel'

function SideNav() {
  const {user}=useKindeBrowserClient();
  const createFile=useMutation(api.files.createFile);
  const [activeTeam,setActiveTeam]=useState<TEAM>();
  const convex=useConvex();
  const [totalFiles,setTotalFiles]=useState<Number>();
  const {fileList_,setFileList_}=useContext(FileListContext);
  useEffect(()=>{
     activeTeam&&getFiles();
  },[activeTeam])
  const onFileCreate=(fileName:string)=>{
    console.log(fileName)
   if (!activeTeam?._id) {
  console.error("No team selected. Cannot create file.");
  return;
}
    createFile({
      fileName:fileName,
      teamId:activeTeam?._id,
      createdBy:user?.email,
      archive:false,
      document:'',
      whiteboard:''
    }).then(resp=>{
      if(resp)
      {
        getFiles();
        toast('File created successfully!')
      }
    },(e)=>{
      toast('Error while creating file')
    })
  }
  const getFiles=async()=>{
     if (!activeTeam?._id) {
    console.error("No team selected. Cannot fetch files.");
    return;
  }

  try {
      const result = await query(api.files.getFiles, {
      teamId: activeTeam._id
      });
     setFileList_(result);
     setTotalFiles(result?.length||0)
  }catch (error) {
    console.error("Error fetching files:", error);
  }
  };

  return (
    <div
    className=' h-screen fixed w-72 border-r border-[1px] p-6 flex flex-col'
    >
      <div className='flex-1'>
        <SideNavTopSection user={user}
        setActiveTeamInfo={(activeTeam:TEAM)=>setActiveTeam(activeTeam)}
        />
      </div>
      <div>
        <SideNavBottomSection
        totalFiles={totalFiles}
        onFileCreate={onFileCreate}/>
      </div>
    </div>
  )
}

export default SideNav