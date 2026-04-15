"use client";

import { useTranslations } from "next-intl";
import { LocaleDialog } from "@/components/app";
import { PageContainer } from "@/components/app/page-container";
import { DemoTabs } from "@/components/demo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function HomePage() {
  const tDemo = useTranslations("demo");

  return (
    <PageContainer
      title={tDemo("pageTitle")}
      subtitle={tDemo("pageSubtitle")}
      actions={
        <div className='flex items-center gap-1'>
          <ThemeToggle />
          <LocaleDialog />
        </div>
      }
    >
      <DemoTabs />
    </PageContainer>
  );
}
