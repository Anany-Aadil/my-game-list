"use client";

import { useState, useEffect } from "react";

import WelcomeBox from "./welcome-box";
import SideList from "./side-list";
import Footer from "./footer";
import Banner from "./banner";
import Thumbnail from "./thumbnail";
import Row from "./stack-link";

export default function MainPage() {
  const [upcomingGames, setUpcomingGames] = useState<any[]>([]);
  const [recentGames, setRecentGames] = useState<any[]>([]);
  const [topRatedGames, setTopRatedGames] = useState<any[]>([]);
  const [bannerGame, setBannerGame] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(true);
  const [bannerList, setBannerList] = useState<any[]>([]);

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

  const chooseBannerGame = async () => {
    const res = await fetch(`/api/category`);
    const data = await res.json();

    setBannerList(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchUpcoming();
    chooseBannerGame();
  }, []);

  useEffect(() => {
    if (!Array.isArray(bannerList) || bannerList.length === 0) return;

    const pickRandom = () => {
      let newGame;

      do {
        newGame = bannerList[Math.floor(Math.random() * bannerList.length)];
      } while (newGame.id === bannerGame?.id);

      setBannerGame(newGame);
    };

    pickRandom();

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        pickRandom();
        setFade(true);
      }, 700);
    }, 10000);

    return () => clearInterval(interval);
  }, [bannerList]);

  if (loading) return <div className="md:mt-20 mt-15">Loading...</div>;

  return (
    <>
      <DeskView
        bannerGame={bannerGame}
        recentGames={recentGames}
        upcomingGames={upcomingGames}
        fade={fade}
        topRatedGames={topRatedGames}
      />
      <section className="mt-15 md:hidden">
        <div className=" relative">
          <WelcomeBox />
          <div className="h-10 w-full md:hidden bg-linear-to-t from-neutral-200 via-neutral-200/50 to-transparent absolute -bottom-0.5"></div>
        </div>
        <Row category={recentGames} title="Recent Titles" />
        <Row category={upcomingGames} title="Most Anticipated Titles" />
        <Row category={topRatedGames} title="Top Rated Titles" />
        <Footer />
      </section>
    </>
  );
}

function DeskView({
  recentGames,
  bannerGame,
  upcomingGames,
  topRatedGames,
  fade,
}: {
  recentGames: React.ComponentState;
  bannerGame: React.ComponentState;
  upcomingGames: React.ComponentState;
  topRatedGames: React.ComponentState;
  fade: React.ComponentState;
}) {
  return (
    <section className="w-4/5 pt-20 mx-auto md:flex justify-between hidden bg-neutral-100">
      <main className="w-3/4 m-2 flex flex-col justify-between">
        <WelcomeBox />
        <Row category={recentGames} title="Recent Titles" />
        <div className="w-full h-100 border flex mb-2 mt-4 bg-neutral-700">
          {bannerGame && <Banner bannerGame={bannerGame} fade={fade} />}
        </div>
        <Footer />
      </main>
      <main className="w-fit mr-2">
        <SideList gameCategory={upcomingGames} title="Most Anticipated Games" />
        <SideList gameCategory={topRatedGames} title="Top Rated Games" />
      </main>
    </section>
  );
}
