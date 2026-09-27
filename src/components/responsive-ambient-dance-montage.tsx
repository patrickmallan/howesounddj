"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AmbientDanceMontage = dynamic(() =>
  import("@/components/ambient-dance-montage").then((module) => module.AmbientDanceMontage),
);

type ResponsiveAmbientDanceMontageProps = {
  fingerprintClassName: string;
  logoClassName: string;
  viewport: "desktop" | "mobile";
};

const MOBILE_MEDIA_QUERY = "(max-width: 700px)";

export function ResponsiveAmbientDanceMontage({
  fingerprintClassName,
  logoClassName,
  viewport,
}: ResponsiveAmbientDanceMontageProps) {
  const [matchesViewport, setMatchesViewport] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const updateMatch = () => {
      setMatchesViewport(viewport === "mobile" ? mobileQuery.matches : !mobileQuery.matches);
    };

    updateMatch();
    mobileQuery.addEventListener("change", updateMatch);
    return () => mobileQuery.removeEventListener("change", updateMatch);
  }, [viewport]);

  if (!matchesViewport) return null;

  return (
    <AmbientDanceMontage
      fingerprintClassName={fingerprintClassName}
      logoClassName={logoClassName}
    />
  );
}
