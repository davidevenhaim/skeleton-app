"use client";

import { useTranslations } from "next-intl";
import { PageContainer } from "@/components/app/page-container";
import { DemoTabs } from "@/components/demo";
import Actions from "@/components/demo/layout/actions";

export default function HomePage() {
  const tDemo = useTranslations("demo");

  return (
    <PageContainer
      title={tDemo("pageTitle")}
      subtitle={tDemo("pageSubtitle")}
      actions={<Actions />}
    >
      <DemoTabs />
    </PageContainer>
  );
}
