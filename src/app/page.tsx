import Banner from "@/components/banner";
import { Navbar } from "@/components/navbar";
import { NovelList } from "@/components/novel/novelList";
import { BannerService } from "@/services/banner.service";
import { NovelService } from "@/services/novel.service";

export default async function Home() {
  const novels = await NovelService.getNovels()
  const banners = await BannerService.getBanners()
  return (
    <>
      <Navbar withSubmenu={true} />
      <Banner banners={banners} />
      <NovelList novels={novels} />
    </>
  );
}
