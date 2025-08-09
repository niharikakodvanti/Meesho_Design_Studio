import { FileListContext } from '@/app/_context/FilesListContext'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Archive, MoreHorizontal } from 'lucide-react';
import moment from "moment";
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';
export interface FILE{
   archive:boolean,
   createdBy:string,
   document:string,
   fileName:string,
   teamId:string,
   whiteboard:string,
   _id:string,
   _creationTime:number
}
function FileList() {
  const {fileList_,setFileList_}=useContext(FileListContext);
  const [fileList,setFileList]=useState<any>();
  const {user}:any=useKindeBrowserClient();
  const router=useRouter();
  useEffect(()=>{
    fileList_&&setFileList(fileList_);
    console.log(fileList_);
  },[fileList_])
  return (
    <div className='mt-10'>
        <div className="overflow-x-auto">
  <table className="min-w-full divide-y-2 divide-gray-200">
    <thead className="ltr:text-left rtl:text-right">
      <tr className="*:font-medium *:text-gray-900">
        <th className="px-3 py-2 whitespace-nowrap">File Name</th>
        <th className="px-3 py-2 whitespace-nowrap">Created At</th>
        <th className="px-3 py-2 whitespace-nowrap">Edited</th>
        <th className="px-3 py-2 whitespace-nowrap">Author</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
      {fileList&&fileList.map((file:FILE,index:number)=>(
        <tr className="*:text-gray-900 *:first:font-medium cursor-pointer"
        onClick={()=>router.push('/workspace/'+file._id)}
        >
        <td className="px-3 py-2 whitespace-nowrap">{file.fileName}</td>
        <td className="px-3 py-2 whitespace-nowrap">{moment(file._creationTime).format('DD MM YYYY')}</td>
        <td className="px-3 py-2 whitespace-nowrap">{moment(file._creationTime).format('DD MM YYYY')}</td>
        <td className="px-3 py-2 whitespace-nowrap"><Image src={user?.picture}
        alt='user'
        width={30}
        height={30} 
        className='rounded-full'
        /></td>
        <td className="px-3 py-2 whitespace-nowrap">
        <DropdownMenu>
  <DropdownMenuTrigger><MoreHorizontal/></DropdownMenuTrigger>
  <DropdownMenuContent>
    
    <DropdownMenuItem className='gap-3'><Archive className='h-4 w-4'/>Archive</DropdownMenuItem>
   
  </DropdownMenuContent>
</DropdownMenu>
        </td>
      </tr>
      ))}
      
    </tbody>
  </table>
</div>
    </div>
  )
}

export default FileList