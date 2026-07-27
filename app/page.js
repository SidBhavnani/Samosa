import AboutSection from "./_components/home/AboutSection";
import BoardSection from "./_components/home/BoardSection";
import CTASection from "./_components/home/CTASection";
import { GameNightGallery } from "./_components/home/GameNightGallery";
import HeroSection from "./_components/home/HeroSection";
import HowToPlay from "./_components/home/HowToPlay";
import StatsSection from "./_components/home/StatsSection";
import Testimonials from "./_components/home/Testimonials";
import StickyCartButton from "./_components/home/StickyCartButton";
import TryMeSection from "./_components/home/TryMeSection";
import { createClient } from "@/prismicio";

export default async function Home() {
  // const [showStickyCart, setShowStickyCart] = useState(false);
  // const ctaSectionRef = useRef(null);

  // useEffect(() => {
  //   let ticking = false;

  //   const handleScroll = () => {
  //     if (!ticking) {
  //       requestAnimationFrame(() => {
  //         setShowStickyCart(window.scrollY > 600);
  //         ticking = false;
  //       });
  //       ticking = true;
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const client = createClient();
  const page = await client.getSingle("homepage");

  return (
    <>
      <HeroSection data={page.data} />
      <StatsSection data={page.data} />
      {/* All sections after stats bar wrapped for parallax layering */}
      <div className="relative" style={{ zIndex: 20 }}>
        <AboutSection data={page.data} />
        <BoardSection data={page.data} />
        <HowToPlay data={page.data} />
        <TryMeSection data={page.data} />
        <Testimonials data={page.data} />
        <GameNightGallery data={page.data} />
        <CTASection data={page.data} />
        {/* <CTASection ctaSectionRef={ctaSectionRef} /> */}
        <StickyCartButton data={page.data} />
        {/* <StickyCartButton showStickyCart={showStickyCart} /> */}
      </div>
    </>
  );
}
