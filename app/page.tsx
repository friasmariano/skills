import FeaturedSection from "@/components/FeaturedSection";
import Overview from "@/components/Overview";

export default function Home() {
  return (
    <div style={{ marginTop: '14px', marginRight: '15px', marginLeft: '12px' }}>
      <FeaturedSection />
      <Overview />
    </div>
  );
}
