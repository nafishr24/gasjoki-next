import HomeClient from "./HomeClient";
import Stats from "../components/layouts/Stats";
import Profil from "../components/layouts/Profil";
import WhyChooseUs from "../components/layouts/WhyChooseUs";
import Testimoni from "../components/layouts/Testimoni";

export default function Home() {
  return (
    <HomeClient
      stats={<Stats />}
      profil={<Profil />}
      whyChooseUs={<WhyChooseUs />}
      testimoni={<Testimoni />}
    />
  );
}
