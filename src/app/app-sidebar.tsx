import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import {ChevronDown} from "lucide-react"
export function AppSidebar({name, names} : {
  name?: string | null,
  names?: string[]
}) {

  const items = [
    {
      title: "Home",
      url: "/"
    },
    {
      title: "Blockchain",
      url: "/blockchain"
    },
    {
      title: "Explorer",
      url: "/explorer"
    },
    {
      title: "Mempool",
      url: "/mempool"
    }
  ]

  return (
    <Sidebar className={"pt-10 pl-6 pr-6 "}>
      <SidebarContent className={"bg-black"}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Wallets
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {names && names.map((item) => (
                    <SidebarMenuItem key={item}>
                      <SidebarMenuButton asChild>
                        <a href={"/wallet/" + item}>
                          <span>{(item === "" ? "`default`" : item)}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
    </Sidebar>
  )
}