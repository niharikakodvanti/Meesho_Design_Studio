"use client"
import React, { useEffect, useState, use } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from '../_components/Editor'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FILE } from '../../dashboard/_components/FileList';
import Canvas from '../_components/Canvas';

function Workspace({params}: {params: Promise<{fileId: string}>}) {
  const [triggerSave,setTriggerSave]=useState(false);
  const convex=useConvex();
  const [fileData,setFileData]=useState<FILE|any>();
  
  // Unwrap params using React.use() as required by Next.js 15
  const resolvedParams = use(params);
  const fileId = resolvedParams.fileId;
  
  useEffect(()=>{
    console.log("FILEID", fileId)
    if (fileId) {
      getFileData();
    }
  },[fileId])
  
  const getFileData=async()=>{
    if (!fileId) return;
    
    try {
      const result=await convex.query(api.files.getFileById,{_id:fileId as any})
      setFileData(result);
    } catch (error) {
      console.error('Error fetching file data:', error);
    }
  }
  
  return (
    <div> 
      <WorkspaceHeader onSave={()=>setTriggerSave(!triggerSave)}/>
      {/* Workspace Layout */}
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {/* Document */}
        <div className=' h-screen'>
           <Editor onSaveTrigger={triggerSave} fileId={fileId}
           fileData={fileData}
           />
        </div>
        {/*Whiteboard/canvas */}
        <div className='h-screen border-l'>
          <Canvas
          onSaveTrigger={triggerSave} fileId={fileId}
          fileData={fileData}
          />
        </div>
      </div>
    </div>
  )
}

export default Workspace