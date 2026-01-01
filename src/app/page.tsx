import Banner from "@/components/banner";
import { Navbar } from "@/components/navbar";
import { NovelList } from "@/components/novel/novelList";

export default function Home() {
  return (
    <>
      <Navbar withSubmenu={true} />
      <Banner />
      <NovelList />
    </>
  );
}
