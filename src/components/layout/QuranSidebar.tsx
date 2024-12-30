import { Book, Search, Bookmark, Layout, FileText, BookOpen, BookText, BookMarked } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

export const QuranSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Book, label: "Complete Quran", path: "/quran" },
    { icon: Bookmark, label: "Juz", path: "/juz" },
    { icon: Layout, label: "Ruku", path: "/ruku" },
    { icon: FileText, label: "Page", path: "/page" },
    { icon: BookOpen, label: "Hizb Quarter", path: "/hizb" },
    { icon: BookText, label: "Ayah", path: "/ayah" },
    { icon: BookMarked, label: "Manzil", path: "/manzil" },
    { icon: Search, label: "Search", path: "/search" },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton onClick={() => navigate(item.path)} className="w-full">
                    <item.icon className="w-4 h-4 mr-2" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};