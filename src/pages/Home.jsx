import React from "react";
import Build from "../components/Build";
import FloatingCTAs from "../components/FloatingCTAs";
import ImageCarousel from "../components/ImageCarousel";
import LatestUpdateCard from "../components/LatestUpdateCard";
import Short from "../components/Short";
import SomiBuildingUpdate from "../components/SomiBuildingUpdate";
import VisionSection from "../components/VisionSection";

const GOAL_EUR = 32_500_000; // << ton objectif en € (à adapter)

const Home = () => {
  const [raised, setRaised] = React.useState(null);   // en €
  const [err, setErr] = React.useState("");

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/.netlify/functions/get-donation-total");
        const text = await res.text();
        const data = (() => { try { return JSON.parse(text); } catch { return { error: text }; } })();
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
        const euros = (data.total_cents || 0) / 100;
        if (alive) setRaised(euros);
      } catch (e) {
        console.error(e);
        if (alive) { setErr(e.message); setRaised(0); }
      }
    })();
    return () => { alive = false; };
  }, []);

  const footnoteGoal = Math.max(GOAL_EUR - (raised ?? 0), 0);

  return (
    <>
      <Build />
      <Short
        videos={["C7Co5SLVbY4","lc8_4sj3G3Q","v2iRuO_u4aY"]}
        sideTitle="VOUS SOMI GROUNDBREAKING"
        sideSubtitle="Le cœur derrière la vision"
        sideText="Texte explicatif…"
        ctaLabel="See the vision"
        ctaHref="/vision"
      />

      {/* Jauge dynamique (affiche 0 en attendant la valeur) */}
      <SomiBuildingUpdate
        raised={Math.round(raised ?? 0)}
        goal={GOAL_EUR}
        footnoteGoal={Math.round(footnoteGoal)}
      />

      <LatestUpdateCard
        paragraphs={[
          "Over the last year and a half…",
          "As of Monday, July 7th…",
          "We will officially break ground…",
          "As we begin construction…",
          "We extend our heartfelt gratitude…",
        ]}
      />

      <VisionSection videoId="uPsJlGybG_M" ctaPrimaryHref="/vision" ctaSecondaryHref="/give" />

      <FloatingCTAs
        anchorIds={["build-cta", "vision-cta"]}
        visionHref="/vision"
        visionLabel="Voir la Vision"
        giveHref="/je-veux-donner"
        giveLabel="Je veux donner"
        topOffset={16}
      />

      <ImageCarousel
        images={[
          { src: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?q=80&w=1740&auto=format&fit=crop", alt: "Entrée du campus" },
          { src: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1740&auto=format&fit=crop", alt: "Lobby" },
          { src: "https://images.unsplash.com/photo-1508985307703-52d13b2b06b3?q=80&w=1740&auto=format&fit=crop", alt: "Auditorium" },
          { src: "https://images.unsplash.com/photo-1449182210692-60ced46ae304?q=80&w=1604&auto=format&fit=crop", alt: "Extérieur" },
          { src: "https://images.unsplash.com/photo-1532140225690-f6d25ab4c891?q=80&w=1740&auto=format&fit=crop", alt: "Parking" },
        ]}
        aspect="16/9"
        autoPlay
        interval={4500}
        rounded="2xl"
      />
    </>
  );
};

export default Home;