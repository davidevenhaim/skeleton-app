import { useTranslations } from "next-intl";
import { HeroWithBackgroundImage } from "@/components/ui/hero-with-background-image";
import { Typography } from "@/components/ui/typography";

export default function RootPage() {
  const t = useTranslations();

  return (
    <HeroWithBackgroundImage
      backgroundImageSrc="/landing-page/globe.png"
      backgroundImageSrcLight="/landing-page/globe-light.png"
      backgroundImageAlt=""
      imagePosition="center 75%"
      contentClassName="mx-auto max-w-4xl"
    >
      <Typography variant="h1" className="text-center text-4xl font-bold md:text-6xl">
        {t("home.startHere")}
      </Typography>
    </HeroWithBackgroundImage>
  );
}
