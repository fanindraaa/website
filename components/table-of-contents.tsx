'use client';

import { useEffect, useRef, useState } from 'react';
import { generateSlug, type TOCItem } from '@/lib/toc';

interface TableOfContentsProps {
  toc: TOCItem[];
}

const ACTIVE_OFFSET = 128;
const JUMP_OFFSET = 96;
const ACTIVE_VIEWPORT_RATIO = 0.38;

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const scrollFrame = useRef<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize audio object once
      audioRef.current = new Audio('/tactile.mp3');
    }
  }, []);

  useEffect(() => {
    if (activeId && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignore autoplay restrictions if the user hasn't interacted with the document yet
      });
    }
  }, [activeId]);

  useEffect(() => {
    if (!toc.length) return;

    const expectedIds = new Set(toc.map((item) => item.id));

    function getHeadings() {
      const allHeadings = Array.from(
        document.querySelectorAll<HTMLElement>('h2, h3')
      );
      return allHeadings.filter((heading) => {
        if (heading.id && expectedIds.has(heading.id)) {
          return true;
        }
        const text = heading.textContent || '';
        const slug = generateSlug(text.trim());
        if (expectedIds.has(slug)) {
          heading.id = slug;
          return true;
        }
        return false;
      });
    }

    function refreshActiveHeading() {
      const headingList = getHeadings();

      if (!headingList.length) {
        setActiveId(null);
        return;
      }

      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollPosition < 30) {
        setActiveId(null);
        return;
      }

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Bottom of page check
      if (windowHeight + Math.round(scrollPosition) >= documentHeight - 50) {
        setActiveId(headingList[headingList.length - 1].id);
        return;
      }

      const activationLine = Math.max(
        ACTIVE_OFFSET,
        windowHeight * ACTIVE_VIEWPORT_RATIO
      );

      for (let i = headingList.length - 1; i >= 0; i--) {
        if (headingList[i].getBoundingClientRect().top <= activationLine) {
          setActiveId(headingList[i].id);
          return;
        }
      }

      if (headingList[0].getBoundingClientRect().top <= windowHeight * 0.75) {
        setActiveId(headingList[0].id);
        return;
      }

      setActiveId(null);
    }

    function scheduleActiveRefresh() {
      if (scrollFrame.current) return;

      scrollFrame.current = requestAnimationFrame(() => {
        scrollFrame.current = null;
        refreshActiveHeading();
      });
    }

    function handleClick(e: Event) {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('.toc-link');
      if (!link || !navRef.current?.contains(link)) return;

      e.preventDefault();

      if (link.classList.contains('toc-title')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.replaceState(null, '', window.location.pathname);
        setActiveId(null);
        return;
      }

      const href = link.getAttribute('href');
      if (!href?.startsWith('#')) return;

      const target = document.getElementById(href.substring(1));
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const offset = rect.top + scrollTop - JUMP_OFFSET;
      window.scrollTo({ top: offset, behavior: 'smooth' });
      history.replaceState(null, '', href);
      setActiveId(target.id);
    }

    const nav = navRef.current;
    nav?.addEventListener('click', handleClick);
    window.addEventListener('scroll', scheduleActiveRefresh, { passive: true });
    window.addEventListener('resize', scheduleActiveRefresh);
    window.addEventListener('hashchange', scheduleActiveRefresh);

    const observer = new MutationObserver(scheduleActiveRefresh);
    observer.observe(document.body, { childList: true, subtree: true });

    scheduleActiveRefresh();
    const hydrationCheck1 = window.setTimeout(scheduleActiveRefresh, 100);
    const hydrationCheck2 = window.setTimeout(scheduleActiveRefresh, 400);

    return () => {
      nav?.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', scheduleActiveRefresh);
      window.removeEventListener('resize', scheduleActiveRefresh);
      window.removeEventListener('hashchange', scheduleActiveRefresh);
      observer.disconnect();
      window.clearTimeout(hydrationCheck1);
      window.clearTimeout(hydrationCheck2);
      if (scrollFrame.current) {
        cancelAnimationFrame(scrollFrame.current);
        scrollFrame.current = null;
      }
    };
  }, [toc]);

  if (!toc.length) return null;

  const activeIndex = activeId === null 
    ? 0 // 0 is "Back to top"
    : toc.findIndex((item) => item.id === activeId) + 1; // +1 to account for "Back to top"

  return (
    <nav
      ref={navRef}
      className="toc-container hidden lg:block mt-8"
      aria-label="Table of contents"
    >
      <ul className="toc-list">
        <li className="toc-item toc-level-0">
          <a
            href="#"
            className={`toc-link toc-title no-underline ${
              activeId === null ? 'active' : ''
            } ${activeIndex === 1 ? 'magnetic-1' : activeIndex === 2 ? 'magnetic-2' : ''}`}
            data-text="Back to top"
          >
            Back to top
          </a>
        </li>
        {toc.map((item, index) => {
          const itemIndex = index + 1;
          const distance = Math.abs(itemIndex - activeIndex);
          let magneticClass = '';
          if (distance === 1) magneticClass = 'magnetic-1';
          else if (distance === 2) magneticClass = 'magnetic-2';

          return (
            <li key={item.id} className={`toc-item toc-level-${item.level}`}>
              <a
                href={`#${item.id}`}
                className={`toc-link no-underline ${
                  activeId === item.id ? 'active' : ''
                } ${magneticClass}`}
                data-text={item.text}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
