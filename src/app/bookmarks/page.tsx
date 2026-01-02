import Banner from "@/components/banner";
import BookmarksList from "@/components/bookmarks/bookmark";
import { Navbar } from "@/components/navbar";
import { BannerService } from "@/services/banner.service";

export default async function Home() {
  const banners = await BannerService.getBanners()
  return (
    <>
      <Navbar withSubmenu={false} />
      <Banner banners={banners} />
      <section className="container md:mx-auto px-2.5 md:px-0 mt-15 flex flex-col mb-3.5">
        <h1 className="text-3xl font-bold tracking-tight">รายการที่คั่นไว้</h1>
      </section>
      <div className="dark:bg-zinc-800 bg-zinc-300 w-full h-px" />
      <BookmarksList />
    </>
  );
}
