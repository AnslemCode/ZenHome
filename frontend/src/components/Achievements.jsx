import { useState, useEffect } from "react";
import CountUp from "react-countup";
import { LiaCertificateSolid } from "react-icons/lia";

const Achievements = () => {
  const [isVisible, setIsVisible] = useState(true);
  const statistics = [
    { label: "Happy clients", value: 12 },
    { label: "Different cities", value: 3 },
    { label: "Project completed", value: 45 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const achievementsSection = document.getElementById("achievements");
      if (achievementsSection) {
        const top = achievementsSection.getBoundingClientRect().top;
        const invisible = top < window.innerHeight - 100;
        setIsVisible(invisible);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section id="achievements" className="mx-auto max-w-[1440px]">
      <div className="flex flex-col xl:flex-row">
        {/* LEFT SIDE */}
        <div className="flex-[6] flex justify-center flex-col bg-[#008274] text-white px-6 lg:px-12 py-16">
          <h2 className="h2">Our Achievements</h2>
          <p
            className="py-5 text-white
           max-w-[47rem]"
          >
            Zen Home Company proudly celebrates 10 years of redefining modern
            living with over 5,000 dream homes delivered. Our commitment to
            sustainability and innovative design has earned us the trust of
            thousands of happy homeowners. Together, we’re building a future of
            comfort, style, and harmony.
          </p>
          <div className="flex flex-wrap gap-4">
            {statistics.map((item, index) => (
              <div key={index} className="p-4 rounded-lg">
                <div className="flex items-center gap-1">
                  <CountUp
                    start={isVisible ? 0 : null}
                    end={item.value}
                    duration={10}
                    delay={1}
                  >
                    {({ countUpRef }) => (
                      <h3 ref={countUpRef} className="text-5xl font-sans"></h3>
                    )}
                  </CountUp>
                  <h4 className="regular-32">k+</h4>
                </div>
                <p className="text-white capitalize pt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex-[2] relative bg-primary px-6 lg:px-12 py-16 flexCenter">
          <div className="p-4 rounded-lg flexCenter flex-col xl:-rotate-90">
            <span className="relative bottom-8 p-3 flex items-center rounded-full">
              <LiaCertificateSolid className="text-5xl text-black" />
            </span>
            <span>
              Zen Home Company is proudly certified for excellence in
              sustainable design and quality housing, ensuring trust and
              satisfaction in every home we build.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
