"use client";

import { useEffect } from "react";
import styles from "./heading-letter-flash-controller.module.css";

const HEADING_SELECTOR = "main h2:not(.sr-only):not(.no-letter-flash)";
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
        letter.style.setProperty("--hsdj-letter-index", String(letterIndex));
        letter.style.setProperty("--hsdj-letter-delay", `${700 + letterIndex * 68}ms`);
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
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observed = new WeakSet<Element>();
    const visible = new Set<HTMLHeadingElement>();
    const stopSequence = (heading: HTMLHeadingElement) => {
      heading.dataset.letterFlash = "paused";
    };

    const startSequence = (heading: HTMLHeadingElement) => {
      if (document.hidden) return;
      wrapHeadingLetters(heading);
      heading.dataset.letterFlash = "running";
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
      intersection.disconnect();
      mutation.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return null;
}
