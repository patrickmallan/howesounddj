"use client";

import { useEffect } from "react";
import styles from "./heading-letter-flash-controller.module.css";

const HEADING_SELECTOR = "main h2:not(.sr-only):not(.no-letter-flash)";
const INITIAL_HOLD_MS = 700;
const LETTER_OFF_MS = 170;
const BETWEEN_LETTERS_MS = 55;
const FULL_HEADING_HOLD_MS = 1450;

function wrapHeadingLetters(heading: HTMLHeadingElement) {
  if (heading.dataset.letterFlashReady === "true") return 0;
  if (!heading.hasAttribute("aria-label")) {
    heading.setAttribute("aria-label", heading.textContent?.replace(/\s+/g, " ").trim() ?? "");
  }
  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

  let letterIndex = 0;
  textNodes.forEach((textNode) => {
    const fragment = document.createDocumentFragment();
    const parts = textNode.data.split(/(\s+)/);
    parts.forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        fragment.append(document.createTextNode(part));
        return;
      }
      const word = document.createElement("span");
      word.className = styles.word;
      [...part].forEach((character) => {
        const letter = document.createElement("span");
        letter.className = styles.character;
        letter.textContent = character;
        word.append(letter);
        letterIndex += 1;
      });
      fragment.append(word);
    });
    textNode.replaceWith(fragment);
  });
  heading.dataset.letterFlashReady = "true";
  return letterIndex;
}

export function HeadingLetterFlashController() {
  useEffect(() => {
    const observed = new WeakSet<Element>();
    const visible = new Set<HTMLHeadingElement>();
    const running = new Map<HTMLHeadingElement, () => void>();

    const stopSequence = (heading: HTMLHeadingElement) => {
      running.get(heading)?.();
      running.delete(heading);
      heading.dataset.letterFlash = "paused";
      heading.querySelectorAll(`.${styles.off}`).forEach((letter) => letter.classList.remove(styles.off));
    };

    const startSequence = (heading: HTMLHeadingElement) => {
      if (running.has(heading) || document.hidden) return;
      wrapHeadingLetters(heading);
      const letters = [...heading.querySelectorAll<HTMLElement>(`.${styles.character}`)];
      if (!letters.length) return;

      let stopped = false;
      let letterIndex = 0;
      let timer = 0;
      const cueLetter = () => {
        if (stopped) return;
        const letter = letters[letterIndex];
        letter.classList.add(styles.off);
        timer = window.setTimeout(() => {
          letter.classList.remove(styles.off);
          letterIndex += 1;
          if (letterIndex >= letters.length) {
            letterIndex = 0;
            timer = window.setTimeout(cueLetter, FULL_HEADING_HOLD_MS);
            return;
          }
          timer = window.setTimeout(cueLetter, BETWEEN_LETTERS_MS);
        }, LETTER_OFF_MS);
      };

      heading.dataset.letterFlash = "running";
      timer = window.setTimeout(cueLetter, INITIAL_HOLD_MS);
      running.set(heading, () => {
        stopped = true;
        window.clearTimeout(timer);
        letters.forEach((letter) => letter.classList.remove(styles.off));
      });
    };

    const intersection = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const heading = entry.target as HTMLHeadingElement;
        if (entry.isIntersecting) {
          visible.add(heading);
          startSequence(heading);
        } else {
          visible.delete(heading);
          stopSequence(heading);
        }
      });
    }, { rootMargin: "8% 0px 8%", threshold: .08 });

    const scan = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLHeadingElement>(HEADING_SELECTOR).forEach((heading) => {
        if (observed.has(heading)) return;
        observed.add(heading);
        intersection.observe(heading);
      });
    };

    scan();
    const mutation = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node instanceof Element) scan(node);
      }));
    });
    const main = document.querySelector("main");
    if (main) mutation.observe(main, { childList: true, subtree: true });
    const onVisibilityChange = () => {
      if (document.hidden) {
        document.querySelectorAll<HTMLHeadingElement>(HEADING_SELECTOR).forEach(stopSequence);
        return;
      }
      visible.forEach(startSequence);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      [...running.keys()].forEach(stopSequence);
      intersection.disconnect();
      mutation.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return null;
}
