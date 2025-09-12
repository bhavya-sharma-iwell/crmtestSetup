import { FileLineChart, Home, UserRound, ClipboardList,ExternalLink } from "lucide-react"
import {
  Sidebar,SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from "@/components/ui/sidebar"


// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Leads",
    url: "/leads",
    icon: FileLineChart,
  },
  {
    title: "Clients",
    url: "/clients",
    icon: UserRound,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: ClipboardList,
  },
]

export function AppSidebar(props = {}) {
  const version = props.version || process.env.APP_VERSION || "1.0.0"
  const DOCS_LOCATION_DOMAIN = props.docsLocationDomain || props.DOCS_LOCATION_DOMAIN || process.env.DOCS_LOCATION_DOMAIN || ""
  const INVESTWELL_CLOUD_IMAGES = props.investwellCloudImages || props.INVESTWELL_CLOUD_IMAGES || process.env.INVESTWELL_CLOUD_IMAGES || ""
  const INVESTWELL_LOGOS = props.investwellLogos || props.INVESTWELL_LOGOS || process.env.INVESTWELL_LOGOS || ""
  const INVESTWELL_LARGE_LOGOS = props.investwellLargeLogos || props.INVESTWELL_LARGE_LOGOS || process.env.INVESTWELL_LARGE_LOGOS || ""
  const INVESTWELL_SMALL_LOGOS = props.investwellSmallLogos || props.INVESTWELL_SMALL_LOGOS || process.env.INVESTWELL_SMALL_LOGOS || ""
  const logoName = props?.userTheme?.logo

  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()

  return (
    <Sidebar collapsible = 'icon' >
      <SidebarHeader>
        <h1 className="logo-main" title={logoName}>
          <a className="logo-investwell flex items-center gap-2">
            <img
                src={`https://preprod-ftp.investwell.io/cloud_investwell_images/logo/Small/newSmallLogo.svg?v=1756875198696`}
              onError={(e)=>{e.target.onerror = null; e.target.src="../../app/media/images/blankLogo.png"}}
              alt={logoName}
              className="logoImg w-8 h-8 rounded-full"
            />
            <span className="text-lg font-medium text-900">Investwell</span>
          </a>
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                  <Link to={item.url}>  <item.icon />
                  <span>{item.title}</span></Link>

                   
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
      <div onClick={() => window.open(`${window.location.origin}/app/#/broker/dashboard`,'_blank')} className="flex items-center justify-between p-4 cursor-pointer">
      {/* <Avatar src="/user-avatar.jpg" alt="User Profile" /> */}
      {/* <Button variant="ghost">Logout</Button> */}
      {open &&<span> Switch to Mint </span>}
<ExternalLink/>

    </div>
      </SidebarFooter>
       
     
    </Sidebar>
  )
}