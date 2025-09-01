import Build from "../components/Build";
import Short from "../components/Short";
import SomiBuildingUpdate from "../components/SomiBuildingUpdate";

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
        sideText="Texte explicatif sur le projet, la vision et les prochaines étapes."
        ctaLabel="See the vision"
        ctaHref="/vision"
      />
      <SomiBuildingUpdate raised={7724443} goal={32500000} footnoteGoal={16250000} />
    </>
  );
};

export default Home;