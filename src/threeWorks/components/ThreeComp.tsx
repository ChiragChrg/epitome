"use client";

import dynamic from "next/dynamic";
import useLoader from "@/store/useLoader";

const ThreeLoader = dynamic(() => import("./ThreeLoader"), {
  ssr: false,
});

const ThreeComp = () => {
  const { setLoadingCompleted, updateLoadingProgress } = useLoader();

  const onProgress = (progress: number) => {
    if (progress >= 100) {
      setTimeout(() => {
        setLoadingCompleted(true);
      }, 1600);
    }

    updateLoadingProgress(progress);
  };

  return (
    <div id="three-work" className="fixed top-0 left-0 z-[-10]">
      <ThreeLoader onProgress={onProgress} />
    </div>
  );
};

export default ThreeComp;
