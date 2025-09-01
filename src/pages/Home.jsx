import React from "react";
import Build from "../components/Build";
import Short from "../components/Short";

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
          "dQw4w9WgXcQ",
          "9bZkp7q19f0",
        ]}
        sideTitle="VOUS SOMI GROUNDBREAKING"
        sideSubtitle="Le cœur derrière la vision"
        sideText="Texte explicatif sur le projet, la vision et les prochaines étapes."
        ctaLabel="See the vision"
        ctaHref="/vision"
      />
    </>
  );
};

export default Home;