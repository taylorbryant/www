"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { experience } from "./experience";
import styles from "./experience-tapes.module.css";

export default function ExperienceTapes() {
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const job = experience[selected];

  return (
    <section aria-labelledby="experience-heading" className="@container mt-12">
      <div className="flex items-baseline justify-between gap-4">
        <h2
          id="experience-heading"
          className="text-xl font-semibold text-gray-900"
        >
          Experience
        </h2>
        <p className="text-base text-gray-500 sm:text-sm">Pick a tape.</p>
      </div>

      <div className={styles.collection}>
        {experience.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            className={styles.tape}
            aria-pressed={selected === index}
            aria-controls="experience-details"
            onClick={() => setSelected(index)}
            onFocus={(event) => {
              if (event.currentTarget.matches(":focus-visible")) {
                setSelected(index);
              }
            }}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") {
                next = (index + 1) % experience.length;
              } else if (event.key === "ArrowLeft") {
                next = (index - 1 + experience.length) % experience.length;
              } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                next = (index + 2) % experience.length;
              } else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = experience.length - 1;
              else return;

              event.preventDefault();
              setSelected(next);
              buttons.current[next]?.focus();
            }}
          >
            <Image
              src={item.artwork}
              alt=""
              fill
              sizes="(max-width: 639px) 46vw, 290px"
              className={styles.artwork}
              draggable={false}
            />
            <span className="sr-only">
              {item.name}, {item.dates}
            </span>
          </button>
        ))}
      </div>

      <div id="experience-details" aria-live="polite" aria-atomic="true">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="font-semibold text-gray-900">
            {job.href ? (
              <a
                href={job.href}
                className="underline-offset-4 hover:text-html-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-html-blue"
              >
                {job.name} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              job.name
            )}
          </h3>
          <p className="shrink-0 text-base text-gray-500 tabular-nums">
            {job.dates}
          </p>
        </div>
        <p className="mt-2 text-base/7 text-pretty text-gray-600">{job.role}</p>
      </div>

      <noscript>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-gray-600">
          {experience.slice(1).map((item) => (
            <li key={item.id}>
              {item.href ? (
                <a className="font-medium text-html-blue" href={item.href}>
                  {item.name}
                </a>
              ) : (
                item.name
              )}
              <p>{item.role}</p>
              <p>{item.dates}</p>
            </li>
          ))}
        </ul>
      </noscript>
    </section>
  );
}
