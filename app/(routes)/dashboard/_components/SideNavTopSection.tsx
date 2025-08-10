import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

interface SideNavTopSectionProps {
  user: any; // You might want to type this properly based on Kinde user type
  setActiveTeamInfo: (team: TEAM) => void;
}

interface MenuItem {
  id: number;
  name: string;
  path: string;
  icon: LucideIcon;
}

function SideNavTopSection({ user, setActiveTeamInfo }: SideNavTopSectionProps) {
  const menu: MenuItem[] = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Users,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];

  const router = useRouter();
  const convex = useConvex();
  const [activeTeam, setActiveTeam] = useState<TEAM | undefined>();
  const [teamList, setTeamList] = useState<TEAM[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user?.email) {
      getTeamList();
    }
  }, [user?.email]);

  useEffect(() => {
    if (activeTeam) {
      setActiveTeamInfo(activeTeam);
    }
  }, [activeTeam, setActiveTeamInfo]);

  const getTeamList = async () => {
    if (!user?.email) {
      console.warn('No user email available');
      return;
    }

    setIsLoading(true);
    try {
      const result = await convex.query(api.teams.getTeam, { email: user.email });
      console.log("TeamList", result);
      
      if (Array.isArray(result)) {
        setTeamList(result);
        // Set the first team as active if no team is currently selected
        if (result.length > 0 && !activeTeam) {
          setActiveTeam(result[0]);
        }
      } else {
        console.error('Unexpected result format from getTeam query');
        setTeamList([]);
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
      setTeamList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const onMenuClick = (item: MenuItem) => {
    if (item.path) {
      router.push(item.path);
    }
  };

  const handleTeamSelect = (team: TEAM) => {
    setActiveTeam(team);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-3 hover:bg-slate-200 p-3 rounded-lg cursor-pointer">
            <Image src="/logo-1.png" alt="logo" width={40} height={40} />
            <h2 className="flex gap-2 items-center font-bold text-[17px]">
              {activeTeam?.teamName || 'Select Team'}
              <ChevronDown />
            </h2>
          </div>
        </PopoverTrigger>

        <PopoverContent className="ml-7 p-4">
          {/* Team Section */}
          <div>
            {teamList.length > 0 ? (
              teamList.map((team) => (
                <h2
                  key={team._id}
                  className={`p-2 hover:bg-blue-500 hover:text-white rounded-lg mb-1 cursor-pointer transition-colors ${
                    activeTeam?._id === team._id ? 'bg-blue-500 text-white' : ''
                  }`}
                  onClick={() => handleTeamSelect(team)}
                >
                  {team.teamName}
                </h2>
              ))
            ) : (
              <p className="p-2 text-gray-500 text-sm">
                {isLoading ? 'Loading teams...' : 'No teams found'}
              </p>
            )}
          </div>
          
          <Separator className='mt-2 bg-slate-100' />
          
          {/* Option Section */}
          <div>
            {menu.map((item) => (
              <h2
                key={item.id}
                className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
                onClick={() => onMenuClick(item)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </h2>
            ))}
            <LogoutLink>
              <h2 className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm">
                <LogOut className="h-4 w-4" />
                Logout
              </h2>
            </LogoutLink>
          </div>
          
          <Separator className='mt-2 bg-slate-100' />
          
          {/* User Info Section */}
          {user && (
            <div className='mt-2 flex gap-2 items-center'>
                             {user?.picture ? (
                 <Image
                   src={user.picture}
                   alt='user'
                   width={30}
                   height={30}
                   className='rounded-full'
                 />
               ) : (
                 <div className='w-[30px] h-[30px] bg-gray-300 rounded-full flex items-center justify-center'>
                   <span className='text-xs text-gray-600'>
                     {user?.given_name?.[0] || user?.email?.[0] || 'U'}
                   </span>
                 </div>
               )}
              <div>
                <h2 className='text-[14px] font-bold'>
                  {user?.given_name} {user?.family_name}
                </h2>
                <h2 className='text-[12px] text-gray-500'>{user?.email}</h2>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
      
      {/* All File Button */}
      <Button variant='outline' className='w-full justify-start gap-2 font-bold mt-8 bg-gray-100'>
        <LayoutGrid className='h-5 w-5' />
        All Files
      </Button>
    </div>
  );
}

export default SideNavTopSection;
