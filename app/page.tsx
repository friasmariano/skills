import Banner from "@/components/Banner";
import FeaturedSection from "@/components/FeaturedSection";
import MainSection from "@/components/MainSection";
import Overview from "@/components/Overview";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <div style={{ marginTop: '14px', marginRight: '15px', marginLeft: '12px' }}>
      <Banner />
      <FeaturedSection />
      <Overview />
      {/* <Skills /> */}
    </div>
  );
}
