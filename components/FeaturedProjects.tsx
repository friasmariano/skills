'use client'

import Image from "next/image";
import Link from "next/link";
import Indicators from "./Indicators";
import Project from "./Project";
import ProjectNew from "./ProjectNew";
import { useAppSelector } from "@/lib/hooks";

export default function FeaturedProjects() {
    const isDark = useAppSelector((state) => state.theme.data.isDark);

    return(
        <div className="mt-[25px] pb-16 bg-white/[0.03] rounded-[20px] shadow-[0_2px_20px_rgba(0,0,0,0.2)]">

        {/* Title */}
        <div className="flex flex-col pt-[50px] pb-[20px] pl-[70px]">
          <h1 className="text-[2rem]"></h1>
        </div>


        <section style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', padding: '0 0px 0px 0px'}}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <Project
                    href="/projects"
                    imageSrc={isDark ? "/Blueprint.webp" : "/Blueprint_light.webp"}
                    imageAlt={"Blueprint"}
                    imageWidth={500}
                    separator={false}
                    featured={false}
                />

                <Project
                    href="/projects"
                    imageSrc={isDark ? "/Blueprint.webp" : "/Blueprint_light.webp"}
                    imageAlt={"GreenWallet"}
                    imageWidth={550}
                    separator={true}
                    featured={true}
                    projectTitle=""
                    hoverable={true}
                />

                <Project
                    href="/projects"
                    imageSrc={isDark ? "/Blueprint.webp" : "/Blueprint_light.webp"}
                    imageAlt={"Blueprint"}
                    imageWidth={900}
                    separator={false}
                    featured={false}
                />
            </div>

            <Indicators />
        </section>
      </div>
    )
}