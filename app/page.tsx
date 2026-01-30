// import Image from "next/image";
import ListItem from "@/components/list-item";
import StatusBar from "@/components/status-bar";
import InfoBar from "@/components/info-bar";
import SideNav from "@/components/side-nav";

export default function Home() {
  return (
    <section className="w-250 m-auto h-[50%]">
      <StatusBar />
      <InfoBar />
      <main>
        <ListItem />
      </main>
      <SideNav />
    </section>
  );
}
