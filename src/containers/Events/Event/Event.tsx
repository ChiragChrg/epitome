/* eslint-disable */
"use client";
import { EventsRayCaster } from "@/threeWorks/Models/EventsModel";
import EventList from "@/utils/EventList";
import { useEffect, useRef, useState } from "react";
import RulesCard from "../RulesCard/RulesCard";
import classes from "./Event.module.css";
import Typewriter from "@/components/CustomUI/TypeWriter";
import ToggleUI from "@/components/CustomUI/ToggleUI";
import { PowerGlitch } from "powerglitch";

type Props = {
  eventName?: string;
  intersecting?: boolean;
};

/**
 * I know the code here is too bad but i was just debugging like this
 * but now it's too late to fix it.
 */

const TRANSITION_TIME = 500;

const Event = ({ }: Props) => {
  const [curEventIndex, setCurEventIndex] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [stopOnFinish, setStopOnFinish] = useState(true);
  const observerRef = useRef<HTMLButtonElement>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);
  const glitchRefs = useRef<HTMLDivElement[]>([]);
  const audioFilePath = "/Music/click.wav";
  const onNextClick = async () => {
    if (EventsRayCaster.transitioning) return;
    EventsRayCaster.moveEvent();

    setStopOnFinish(false);

    setShowTitle(false);
    setTimeout(() => {
      setCurEventIndex((prev) => (prev + 1) % EventList.length);
      setShowTitle(true);
    }, TRANSITION_TIME);
  };
  const addGlitchRef = (el: HTMLDivElement | null) => {
    if (el && !glitchRefs.current.includes(el)) {
      glitchRefs.current.push(el);
    }
  };
  const onPreviousClick = () => {
    if (EventsRayCaster.transitioning) return;
    EventsRayCaster.moveEvent(false);
    setStopOnFinish(false);

    setShowTitle(false);
    setTimeout(() => {
      setCurEventIndex(
        (prev) => (prev - 1 + EventList.length) % EventList.length
      );
      setShowTitle(true);
    }, TRANSITION_TIME);
  };

  const playSound = () => {
    if (soundRef.current) {
      soundRef.current
        .play()
        .catch((error) => console.error("Error playing sound:", error));
    }
  };

  useEffect(() => {
    soundRef.current = new Audio(audioFilePath);
    soundRef.current.preload = "auto";
    glitchRefs.current.forEach((glitchRef) => {
      if (glitchRef) {
        PowerGlitch.glitch(glitchRef, {
          playMode: "always",
          shake: { velocity: 10, amplitudeX: 0.01, amplitudeY: 0.02 },
        });
      }
    });
    const elements = document.querySelectorAll(
      `.${classes.Button},.${classes.Challenge}`
    );

    const handleEvent = () => {
      playSound();
    };

    elements.forEach((element) => {
      element.addEventListener("click", handleEvent); // For click
    });
    return () => {
      elements.forEach((element) => {
        element.removeEventListener("click", handleEvent);
      });
    };
  }, []);

  useEffect(() => {
    const iObserver = new IntersectionObserver((entities) => {
      entities.forEach((entity) => {
        if (entity.isIntersecting) {
          setShowTitle(true);
          EventsRayCaster.moveEvent(true, true);
        } else {
          setShowTitle(false);
          EventsRayCaster.removeEvents();
        }
      });
    });
    if (observerRef.current) iObserver.observe(observerRef.current);
  }, []);

  return (
    <>
      <div className={`mt-3 sm:mt-8 w-full lg:w-2/3 sm:max-w-screen-md`}>
        {/* <div className="font-spaceAge fixed bottom-0 right-0">
          <ToggleUI />
        </div> */}

        <div
          data-augmented-ui="tr-2-clip-x b-clip-x"
          className={`${classes.Content}`}
        >
          <h1
            className={`font-iceland font-bold ${classes.title} ${showTitle ? classes.titleReveal : classes.titleClose
              } text-3xl sm:text-4xl md:text-5xl text-left sm:text-center`}
          >
            {EventList[curEventIndex].title}
          </h1>

          <h2 className="font-iceland text-2xl sm:text-3xl font-bold text-left sm:text-center">
            {EventList[curEventIndex].eventName}
          </h2>

          <p className="mt-4 sm:mt-6 font-oxanium text-lg sm:text-2xl min-h-24">
            <Typewriter
              texts={new Array(EventList[curEventIndex].description)}
              speed={2}
              deleteSpeed={2}
              stopOnFinish={stopOnFinish}
              afterRemove={() => setStopOnFinish(true)}
            />
          </p>

          <div className="flex justify-end mt-4 sm:mt-8">
            <button
              className={`font-iceland text-lg sm:text-2xl border-4 border-[#7093ee] px-6 sm:px-9 py-1 ${classes.Challenge}`}
              ref={observerRef}
              onClick={() => setShowRules(true)}
            >
              Challenge Me
            </button>
          </div>
        </div>

        <div
          className="flex justify-between sm:justify-around mt-6 sm:mt-8"
          ref={addGlitchRef}
        >
          <button
            className={`font-iceland text-lg sm:text-2xl px-6 sm:px-10 py-2 sm:py-3 ${classes.Button}`}
            onClick={onPreviousClick}
            data-augmented-ui="bl-clip tr-clip border"
          >
            Previous Challenge
          </button>

          <button
            className={`font-iceland text-lg sm:text-2xl px-6 sm:px-9 py-2 sm:py-3 ${classes.Button}`}
            onClick={onNextClick}
            data-augmented-ui="bl-clip tr-clip border"
          >
            Next Challenge
          </button>
        </div>
      </div>

      {showRules && (
        <RulesCard
          rules={EventList[curEventIndex].rules}
          onCloseClick={() => setShowRules(false)}
          eventName={EventList[curEventIndex].eventName}
          title={EventList[curEventIndex].title}
          Heads={EventList[curEventIndex].eventHeads}
        />
      )}
    </>
  );
};

export default Event;
