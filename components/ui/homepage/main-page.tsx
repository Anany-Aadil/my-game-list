"use client";

import { useState, useEffect } from "react";

import WelcomeBox from "./welcome-box";
import SideList from "./side-list";
import Footer from "./footer";
import Banner from "./banner";
import Row from "./row";

export default function MainPage() {
  const [upcomingGames, setUpcomingGames] = useState<any[]>([]);
  const [recentGames, setRecentGames] = useState<any[]>([]);
  const [topRatedGames, setTopRatedGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUpcoming = async () => {
    setLoading(true);

    const [anticipated, newly, top] = await Promise.all([
      fetch(`/api/category/anticipated`).then((res) => res.json()),
      fetch(`/api/category/recent`).then((res) => res.json()),
      fetch(`/api/category/toprated`).then((res) => res.json()),
    ]);

    setUpcomingGames(Array.isArray(anticipated) ? anticipated : []);
    setRecentGames(Array.isArray(newly) ? newly : []);
    setTopRatedGames(Array.isArray(top) ? top : []);

    setLoading(false);
  };

  useEffect(() => {
    fetchUpcoming();
  }, []);

  if (loading)
    return <div className="md:mt-20 mt-15 w-4/5 mx-auto">Loading...</div>;

  return (
    <>
      <DeskView
        recentGames={recentGames}
        upcomingGames={upcomingGames}
        topRatedGames={topRatedGames}
      />
    </>
  );
}

function DeskView({
  recentGames,
  upcomingGames,
  topRatedGames,
}: {
  recentGames: React.ComponentState;
  upcomingGames: React.ComponentState;
  topRatedGames: React.ComponentState;
}) {
  return (
    <section className="md:w-4/5 md:pt-20 mt-15 md:mt-0 mx-auto md:flex md:justify-between bg-neutral-100">
      <main className="md:max-w-3/4 md:m-2 md:flex md:flex-col md:justify-between relative">
        <WelcomeBox />
        <div className="h-10 w-full md:hidden bg-linear-to-t from-neutral-200 via-neutral-200/50 to-transparent absolute -bottom-0.5"></div>
        <div className="md:block hidden">
          <Row category={recentGames} title="Recent Titles" />
        </div>
        <div className="w-full h-100 border md:flex mb-2 mt-4 bg-neutral-700 hidden">
          <Banner />
        </div>
        <div className="hidden md:block">
          <Footer />
        </div>
      </main>
      <main className="mx-2 md:hidden">
        <Row category={recentGames} title="Recent Titles" />
        <Row category={upcomingGames} title="Most Anticipated Titles" />
        <Row category={topRatedGames} title="Top Rated Titles" />
      </main>
      <main className="mr-2 hidden md:block">
        <SideList gameCategory={upcomingGames} title="Most Anticipated Games" />
        <SideList gameCategory={topRatedGames} title="Top Rated Games" />
      </main>
      <div className="md:hidden">
        <Footer />
      </div>
    </section>
  );
}
