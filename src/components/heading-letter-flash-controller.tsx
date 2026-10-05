"use client";

import { useEffect } from "react";
import styles from "./heading-letter-flash-controller.module.css";

const HEADING_SELECTOR = "main h2:not(.sr-only):not(.no-letter-flash)";
const INITIAL_HOLD_MS = 700;
const LETTER_OFF_MS = 170;
const BETWEEN_LETTERS_MS = 55;
const FULL_HEADING_HOLD_MS = 1450;
const MOBILE_LETTER_OFF_MS = 270;
const MOBILE_BETWEEN_LETTERS_MS = 75;

function hasVisibleBackplate(heading: HTMLHeadingElement) {
  const style = window.getComputedStyle(heading);
  const backgroundIsVisible = style.backgroundImage !== "none"
    || (style.backgroundColor !== "transparent" && !style.backgroundColor.endsWith(", 0)"));
  return backgroundIsVisible || Number.parseFloat(style.borderLeftWidth) > 1;
}

function fitBackplateToRenderedLines(heading: HTMLHeadingElement) {
  heading.style.removeProperty("width");
  if (!hasVisibleBackplate(heading)) return;

  const headingRect = heading.getBoundingClientRect();
  const scale = heading.offsetWidth > 0 ? headingRect.width / heading.offsetWidth : 1;
  const words = [...heading.querySelectorAll<HTMLElement>(`.${styles.word}`)];
  if (!words.length || !headingRect.width || !scale) return;

  const lines: Array<{ top: number; left: number; right: number }> = [];
  words.forEach((word) => {
    const rect = word.getBoundingClientRect();
    const line = lines.find((candidate) => Math.abs(candidate.top - rect.top) < 2);
    if (line) {
      line.left = Math.min(line.left, rect.left);
      line.right = Math.max(line.right, rect.right);
      return;
    }
    lines.push({ top: rect.top, left: rect.left, right: rect.right });
  });

  const widestLine = Math.max(...lines.map((line) => line.right - line.left)) / scale;
  const style = window.getComputedStyle(heading);
  const chrome = Number.parseFloat(style.paddingLeft)
    + Number.parseFloat(style.paddingRight)
    + Number.parseFloat(style.borderLeftWidth)
    + Number.parseFloat(style.borderRightWidth);
  const naturalWidth = headingRect.width / scale;
  const parentRight = heading.parentElement?.getBoundingClientRect().right ?? innerWidth;
  const availableWidth = Math.max(0, Math.min(parentRight, innerWidth) - Math.max(0, headingRect.left));
  const fittedWidth = Math.min(
    naturalWidth,
    Math.ceil(widestLine + chrome + 2),
    availableWidth / scale,
  );
  heading.style.setProperty("width", `${fittedWidth}px`, "important");
}

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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observed = new Set<HTMLHeadingElement>();
    const visible = new Set<HTMLHeadingElement>();
    const running = new Map<HTMLHeadingElement, () => void>();
    let resizeTimer = 0;

    const scheduleBackplateFit = (heading: HTMLHeadingElement) => {
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        if (heading.isConnected) fitBackplateToRenderedLines(heading);
      }));
    };

    const stopSequence = (heading: HTMLHeadingElement) => {
      running.get(heading)?.();
      running.delete(heading);
      heading.dataset.letterFlash = "paused";
      heading.querySelectorAll(`.${styles.off}`).forEach((letter) => letter.classList.remove(styles.off));
    };

    const startSequence = (heading: HTMLHeadingElement) => {
      if (running.has(heading) || document.hidden) return;
      wrapHeadingLetters(heading);
      scheduleBackplateFit(heading);
      if (reducedMotion.matches) {
        heading.dataset.letterFlash = "paused";
        return;
      }
      const letters = [...heading.querySelectorAll<HTMLElement>(`.${styles.character}`)];
      if (!letters.length) return;

      let stopped = false;
      let letterIndex = 0;
      const timers = new Set<number>();
      const schedule = (callback: () => void, delay: number) => {
        const timer = window.setTimeout(() => {
          timers.delete(timer);
          callback();
        }, delay);
        timers.add(timer);
      };
      const mobile = window.matchMedia("(max-width: 720px)").matches;
      const cueLetter = () => {
        if (stopped) return;
        const letter = letters[letterIndex];
        letter.classList.add(styles.off);
        schedule(() => {
          letter.classList.remove(styles.off);
        }, mobile ? MOBILE_LETTER_OFF_MS : LETTER_OFF_MS);
        letterIndex += 1;
        if (letterIndex >= letters.length) {
          letterIndex = 0;
          schedule(cueLetter, (mobile ? MOBILE_LETTER_OFF_MS : LETTER_OFF_MS) + FULL_HEADING_HOLD_MS);
        } else {
          schedule(cueLetter, mobile ? MOBILE_BETWEEN_LETTERS_MS : LETTER_OFF_MS + BETWEEN_LETTERS_MS);
        }
      };

      heading.dataset.letterFlash = "running";
      schedule(cueLetter, INITIAL_HOLD_MS);
      running.set(heading, () => {
        stopped = true;
        timers.forEach(window.clearTimeout);
        timers.clear();
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

    const register = (heading: HTMLHeadingElement) => {
      if (observed.has(heading)) return;
      observed.add(heading);
      intersection.observe(heading);
    };

    const headingsWithin = (root: ParentNode) => {
      const headings = [...root.querySelectorAll<HTMLHeadingElement>(HEADING_SELECTOR)];
      if (root instanceof HTMLHeadingElement && root.matches(HEADING_SELECTOR)) headings.unshift(root);
      return headings;
    };

    const scan = (root: ParentNode = document) => {
      headingsWithin(root).forEach(register);
    };

    const unscan = (root: ParentNode) => {
      headingsWithin(root).forEach((heading) => {
        if (!observed.has(heading)) return;
        visible.delete(heading);
        stopSequence(heading);
        intersection.unobserve(heading);
        observed.delete(heading);
      });
    };

    scan();
    const mutation = new MutationObserver((records) => {
      records.forEach((record) => {
        record.removedNodes.forEach((node) => {
          if (node instanceof Element) unscan(node);
        });
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) scan(node);
        });
      });
    });
    mutation.observe(document.body, { childList: true, subtree: true });
    const onVisibilityChange = () => {
      if (document.hidden) {
        document.querySelectorAll<HTMLHeadingElement>(HEADING_SELECTOR).forEach(stopSequence);
        return;
      }
      visible.forEach(startSequence);
    };
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => visible.forEach((heading) => {
        fitBackplateToRenderedLines(heading);
      }), 120);
    };
    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        visible.forEach(stopSequence);
        return;
      }
      visible.forEach(startSequence);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", onResize, { passive: true });
    reducedMotion.addEventListener("change", onMotionPreferenceChange);

    return () => {
      window.clearTimeout(resizeTimer);
      observed.forEach((heading) => {
        stopSequence(heading);
        intersection.unobserve(heading);
      });
      observed.clear();
      intersection.disconnect();
      mutation.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", onResize);
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
    };
  }, []);

  return null;
}
