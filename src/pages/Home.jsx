import Build from "../components/Build";
import FloatingCTAs from "../components/FloatingCTAs";
import ImageCarousel from "../components/ImageCarousel";
import LatestUpdateCard from "../components/LatestUpdateCard";
import Short from "../components/Short";
import SomiBuildingUpdate from "../components/SomiBuildingUpdate";
import VisionSection from "../components/VisionSection";

const Home = () => {
  return (
    <>
      <Build
        // si tu veux une vidéo 16:9 sous l’image héro :
        // videoId="jNQXAC9IVRw"
      />
      <Short
        videos={[
          "C7Co5SLVbY4", // <-- remplace par tes IDs YouTube
          "lc8_4sj3G3Q",
          "v2iRuO_u4aY",
        ]}
        sideTitle="VOUS SOMI GROUNDBREAKING"
        sideSubtitle="Le cœur derrière la vision"
        sideText="Texte explicatif sur le projet, la vision et les prochaines étapes. Nous lançons une collecte de dons pour soutenir l’Église MLK dans sa mission.
        Chaque contribution, petite ou grande, nous aide à bâtir et à faire grandir cette vision.
        Ensemble, semons pour aujourd’hui et pour les générations à venir. Chers frères et sœurs,
        Nous lançons une collecte de dons pour soutenir l’Église MLK dans sa mission et ses projets.
        Chaque geste de générosité, petit ou grand, contribue à l’avancement de l’œuvre de Dieu.
        Vos dons permettront de bâtir, d’équiper et de renforcer notre communauté.
        Ensemble, nous portons une vision qui dépasse nos vies et bénira les générations futures.
        Merci de participer avec foi et amour à cette belle aventure spirituelle."
        ctaLabel="See the vision"
        ctaHref="/vision"
      />
      <SomiBuildingUpdate raised={7724443} goal={32500000} footnoteGoal={16250000} />
      <LatestUpdateCard
        paragraphs={[
        "Over the last year and a half, our building team has been working with the city and our architectural firm to develop the new VOUS South Miami building.",
        "As of Monday, July 7th, we have officially signed our construction contract to begin the build-out of our brand-new VOUS South Miami facility.",
        "We will officially break ground on Monday, August 4th. This is a huge milestone and the commencement of our building timeline, which is approximately 24 months.",
        "As we begin construction, our SoMi Sunday location will be moving to South Miami Senior High starting Sunday, August 3rd. Same heart, same community, just a temporary new location as we prepare for all that's ahead.",
        "We extend our heartfelt gratitude for the unwavering support we've received thus far. With faith and trust, we're fully committed to advancing this exciting project together. Thank you for your prayers and contributions thus far!",
        ]}
      />
      <VisionSection videoId="uPsJlGybG_M" ctaPrimaryHref="/vision" ctaSecondaryHref="/give" />
      {/* CTAs flottants : visibles seulement quand #build-cta et #vision-cta sont hors écran */}
      <FloatingCTAs
        anchorIds={["build-cta", "vision-cta"]}
        visionHref="/vision"
        visionLabel="See the Vision"
        giveHref="/give"
        giveLabel="Je veux donner"
        topOffset={16}
      />

      <ImageCarousel
        images={[
          { src: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Entrée du campus" },
          { src: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Lobby" },
          { src: "https://images.unsplash.com/photo-1508985307703-52d13b2b06b3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Auditorium" },
          { src: "https://images.unsplash.com/photo-1449182210692-60ced46ae304?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Extérieur" },
          { src: "https://images.unsplash.com/photo-1532140225690-f6d25ab4c891?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Parking" },
        ]}
        aspect="16/9"      // ou "3/2", "4/3", etc.
        autoPlay={true}
        interval={4500}
        rounded="2xl"      // arrondis Tailwind: 'lg', 'xl', '2xl'...
      />

    </>
  );
};

export default Home;