"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { getMenuItemsForRole } from "@/lib/menu-config";
import logo from "@/public/icon.png";
import { X, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";

interface RoleBasedSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function RoleBasedSidebar({ isOpen, setIsOpen }: RoleBasedSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMobile();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    // Get user data and filter menu items by role
    try {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const userData = JSON.parse(currentUser);
        setUser(userData);
        
        // Get menu items for user's role
        const roleBasedMenu = getMenuItemsForRole(userData.role);
        setMenuItems(roleBasedMenu);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('currentUser');
    
    // Clear authentication cookies
    document.cookie = 'dakshin-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'dakshin-user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    
    // Redirect to login
    router.push('/auth/login');
  };

  const toggleSubmenu = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(title);
    }
  };

  const sidebarClasses = cn(
    "!fixed h-full left-0 bottom-0 z-50 flex w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out", 
    {
      "translate-x-0": isOpen,
      "-translate-x-full": !isOpen,
    }
  );

  // Auto-open submenu if current page is in submenu
  useEffect(() => {
    const foundItem = menuItems.find((item) => {
      if (item.submenu) {
        return item.submenu.some((subItem: any) => pathname === subItem.href);
      }
      return pathname === item.href;
    });
    if (foundItem?.submenu) {
      setOpenSubmenu(foundItem.title);
    }
  }, [menuItems, pathname]);

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'superadmin': return 'Super Admin';
      case 'admin': return 'Administrator';
      case 'doctor': return 'Doctor';
      case 'frontdesk_staff': return 'Front Desk Staff';
      default: return 'User';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'superadmin': return 'text-red-400';
      case 'admin': return 'text-orange-400';
      case 'doctor': return 'text-blue-400';
      case 'frontdesk_staff': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <aside className={sidebarClasses}>
      <div className="flex py-3 xl:py-3.5 items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Image src={logo} alt="DakshinRehab" width={36} height={36} />
          <span className="font-bold inline-block">DakshinRehab</span>
        </Link>
        <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setIsOpen(false)}>
          <X className="size-6" />
          <span className="sr-only">Close sidebar</span>
        </Button>
      </div>

      <div className="flex-1 py-2 border-t h-full overflow-y-auto">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <div key={item.title} className="space-y-1 custom-scrollbar">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      item.href !== "/dashboard" && pathname.startsWith(item.href) 
                        ? "bg-primary/10 text-primary" 
                        : " hover:bg-muted hover:text-foreground",
                      pathname === "/dashboard" && item.href === "/dashboard" 
                        ? "bg-primary/10 text-primary" 
                        : " hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={cn("h-4 w-4 transition-transform", {
                        "rotate-180": openSubmenu === item.title,
                      })}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <AnimateHeight height={openSubmenu === item.title ? "auto" : 0}>
                    <div className="ml-4 space-y-1 pl-2 pt-1">
                      {item.submenu.map((subItem: any) => (
                        <Link 
                          key={subItem.title} 
                          href={subItem.href} 
                          className={cn(
                            "flex items-center rounded-md px-3 py-2 text-sm transition-colors", 
                            pathname === subItem.href 
                              ? "bg-primary/10 text-primary" 
                              : " hover:bg-muted hover:text-foreground"
                          )} 
                          onClick={() => isMobile && setIsOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </AnimateHeight>
                </>
              ) : (
                <Link 
                  href={item.href} 
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors", 
                    pathname === item.href 
                      ? "bg-primary/10 text-primary" 
                      : " hover:bg-muted hover:text-foreground"
                  )} 
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="border-t p-4 shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt={user?.name || 'User'} />
            <AvatarFallback>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-0.5 flex-1">
            <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
            <p className={cn("text-xs font-medium", getRoleColor(user?.role))}>
              {getRoleDisplayName(user?.role)}
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}