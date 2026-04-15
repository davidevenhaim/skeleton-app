"use client";

import { useTranslations } from "next-intl";
import Iconify from "@/components/ui/iconify";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Typography } from "@/components/ui/typography";
import { DemoDashboardTab } from "@/components/demo/dashboard-tab";
import { DemoDialogsTab } from "@/components/demo/dialogs-tab";
import { DemoFormsTab } from "@/components/demo/forms-tab";
import { DemoGuideTab } from "@/components/demo/guide-tab";
import { DemoTypographyTab } from "@/components/demo/typography-tab";
import { DemoTokenUsageTab } from "@/components/demo/token-usage-tab";
import { DemoTechnicalGuideTab } from "@/components/demo/technical-guide-tab";

export function DemoTabs() {
  const t = useTranslations();

  return (
    <Tabs defaultValue='guide' className='w-full'>
      <TabsList
        variant='line'
        className='mb-6 w-full max-w-full justify-start overflow-x-auto [-webkit-overflow-scrolling:touch]'
      >
        <TabsTrigger value='guide' className='flex-none shrink-0 gap-1.5'>
          <Iconify icon='lucide:compass' className='size-4' />
          <Typography variant='label2' as='span' className='text-foreground'>
            {t("tabGuide")}
          </Typography>
        </TabsTrigger>
        <TabsTrigger value='token-usage' className='flex-none shrink-0 gap-1.5'>
          <Iconify icon='lucide:coins' className='size-4' />
          <Typography variant='label2' as='span' className='text-foreground'>
            {t("tabTokenUsage")}
          </Typography>
        </TabsTrigger>
        <TabsTrigger value='typography' className='flex-none shrink-0 gap-1.5'>
          <Iconify icon='lucide:eye' className='size-4' />
          <Typography variant='label2' as='span' className='text-foreground'>
            {t("tabView")}
          </Typography>
        </TabsTrigger>
        <TabsTrigger value='dashboard' className='flex-none shrink-0 gap-1.5'>
          <Iconify icon='lucide:layout-dashboard' className='size-4' />
          <Typography variant='label2' as='span' className='text-foreground'>
            {t("tabDashboard")}
          </Typography>
        </TabsTrigger>
        <TabsTrigger value='forms' className='flex-none shrink-0 gap-1.5'>
          <Iconify icon='lucide:file-text' className='size-4' />
          <Typography variant='label2' as='span' className='text-foreground'>
            {t("tabForms")}
          </Typography>
        </TabsTrigger>
        <TabsTrigger value='dialogs' className='flex-none shrink-0 gap-1.5'>
          <Iconify icon='lucide:message-square' className='size-4' />
          <Typography variant='label2' as='span' className='text-foreground'>
            {t("tabDialogs")}
          </Typography>
        </TabsTrigger>
        <TabsTrigger
          value='technical-guide'
          className='flex-none shrink-0 gap-1.5'
        >
          <Iconify icon='lucide:book-open' className='size-4' />
          <Typography variant='label2' as='span' className='text-foreground'>
            {t("tabTechnicalGuide")}
          </Typography>
        </TabsTrigger>
      </TabsList>

      <DemoGuideTab />
      <DemoDashboardTab />
      <DemoFormsTab />
      <DemoDialogsTab />
      <DemoTypographyTab />
      <DemoTokenUsageTab />
      <DemoTechnicalGuideTab />
    </Tabs>
  );
}
