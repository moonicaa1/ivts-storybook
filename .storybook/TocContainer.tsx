import { DocsContainer, type DocsContainerProps } from "@storybook/addon-docs/blocks";
import React, { useEffect, useRef, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TocPos {
  top: number;
  left: number;
  ready: boolean;
}

// ── 아이콘 (inline SVG) ────────────────────────────────────────────
const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export function TocContainer({ children, context }: DocsContainerProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [pos, setPos] = useState<TocPos>({ top: 0, left: 0, ready: false });

  // ── 툴바 상태
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [copied, setCopied] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  // ── iframe 내부에 dark 클래스 + CSS 주입
  const applyDarkToIframe = (iframe: HTMLIFrameElement, dark: boolean) => {
    try {
      const iDoc = iframe.contentDocument ?? iframe.contentWindow?.document;
      if (!iDoc) return;

      if (dark) {
        iDoc.documentElement.classList.add("dark");
        iDoc.body.classList.add("dark");

        let s = iDoc.getElementById("__dark-iframe__") as HTMLStyleElement | null;
        if (!s) {
          s = iDoc.createElement("style");
          s.id = "__dark-iframe__";
          iDoc.head.appendChild(s);
        }
        // CSS 변수 fallback: 실제 값 하드코딩
        s.textContent = `
          html, body, #storybook-root, #root, .sb-show-main {
            background: var(--base-background, oklch(0.145 0 0)) !important;
            color: var(--base-foreground, oklch(0.985 0 0)) !important;
          }
        `;
      } else {
        iDoc.documentElement.classList.remove("dark");
        iDoc.body.classList.remove("dark");
        const s = iDoc.getElementById("__dark-iframe__");
        if (s) s.textContent = "";
      }
    } catch {
      // cross-origin은 무시
    }
  };

  // ── 테마 적용 (html + body + 캔버스 iframe 모두)
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const dark = theme === "dark";

    // 1. 외부 docs 프레임
    if (dark) {
      html.classList.add("dark");
      body.classList.add("dark");
    } else {
      html.classList.remove("dark");
      body.classList.remove("dark");
    }

    // 2. docs 배경 override
    let styleEl = document.getElementById("__dark-override__") as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "__dark-override__";
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = dark
      ? `
        /* ── 전체 배경 ── */
        body, #storybook-root,
        .sbdocs, .sbdocs-wrapper, .sbdocs-content,
        .docs-story, [class*="DocsPageWrapper"] {
          background: var(--base-background, oklch(0.145 0 0)) !important;
          color: var(--base-foreground, oklch(0.985 0 0)) !important;
        }

        /* ── 타이틀 · 설명 · 본문 ── */
        .sbdocs-content h1, .sbdocs-content h2,
        .sbdocs-content h3, .sbdocs-content h4,
        .sbdocs-content p,  .sbdocs-content li,
        .sbdocs-content span, .sbdocs-content label {
          color: var(--base-foreground) !important;
        }
        [class*="Subtitle"], [class*="subtitle"],
        [class*="Description"], [class*="description"] {
          color: var(--muted-foreground) !important;
        }

        /* ── 캔버스 미리보기 박스 전체 ── */
        [class*="PreviewWrapper"], [class*="previewWrapper"],
        [class*="StoryBlock"],     [class*="storyBlock"],
        [class*="DocsStory"],      [class*="docsStory"],
        [class*="ZoomWrapper"],
        .docs-story > div {
          background: var(--card, oklch(0.205 0 0)) !important;
          border-color: var(--border, oklch(1 0 0 / 10%)) !important;
          color: var(--base-foreground) !important;
        }

        /* ── 뷰어 조정 툴바 (줌/확장 버튼 바) ── */
        [class*="ToolbarWrapper"], [class*="toolbarWrapper"],
        [class*="Toolbar"],        [class*="toolbar"],
        [class*="PreviewToolbar"], [class*="previewToolbar"],
        [class*="StoryToolbar"],   [class*="storyToolbar"],
        [class*="ToolBar"],
        .sb-bar {
          background: oklch(0.22 0 0) !important;
          border-color: oklch(1 0 0 / 10%) !important;
          border-bottom: 1px solid oklch(1 0 0 / 10%) !important;
        }
        /* 툴바 내 버튼/아이콘 */
        [class*="ToolbarWrapper"] button,
        [class*="toolbarWrapper"] button,
        [class*="Toolbar"] button,
        [class*="toolbar"] button,
        .sb-bar button {
          background: transparent !important;
          color: oklch(0.75 0 0) !important;
          border-color: transparent !important;
        }
        [class*="ToolbarWrapper"] button:hover,
        [class*="Toolbar"] button:hover,
        [class*="toolbar"] button:hover,
        .sb-bar button:hover {
          background: oklch(0.3 0 0) !important;
          color: oklch(0.95 0 0) !important;
        }
        [class*="ToolbarWrapper"] svg,
        [class*="Toolbar"] svg,
        [class*="toolbar"] svg,
        .sb-bar svg {
          color: oklch(0.75 0 0) !important;
          fill: oklch(0.75 0 0) !important;
        }

        /* ── Controls / ArgsTable ── */
        [class*="TableWrapper"], [class*="ArgsTable"],
        [class*="ArgRow"],       [class*="ResetWrapper"] {
          background: var(--card) !important;
          color: var(--base-foreground) !important;
          border-color: var(--border) !important;
        }
        .sbdocs-content table, .sbdocs-content thead,
        .sbdocs-content tbody,  .sbdocs-content tr {
          background: var(--card) !important;
          border-color: var(--border) !important;
        }
        .sbdocs-content td, .sbdocs-content th {
          background: var(--card) !important;
          color: var(--base-foreground) !important;
          border-color: var(--border) !important;
        }

        /* ── Controls 입력 요소 (radio/checkbox 레이블, input, select) ── */
        .sbdocs-content label,
        .sbdocs-content span,
        .sbdocs-content [class*="Label"],
        .sbdocs-content [class*="label"] {
          color: var(--base-foreground) !important;
        }
        .sbdocs-content input[type="text"],
        .sbdocs-content input[type="number"],
        .sbdocs-content input[type="color"],
        .sbdocs-content textarea,
        .sbdocs-content select {
          background: oklch(0.22 0 0) !important;
          color: var(--base-foreground) !important;
          border-color: var(--border) !important;
        }
        /* radio/checkbox 옵션 목록 */
        .sbdocs-content [class*="RadioControl"],
        .sbdocs-content [class*="CheckboxControl"],
        .sbdocs-content [class*="OptionsControl"],
        .sbdocs-content [class*="SelectControl"],
        .sbdocs-content [class*="BooleanControl"] {
          background: transparent !important;
          color: var(--base-foreground) !important;
        }
        /* reset / Set boolean 버튼 */
        .sbdocs-content [class*="ResetButton"],
        .sbdocs-content [class*="ControlButton"],
        .sbdocs-content [class*="Button"] {
          background: oklch(0.28 0 0) !important;
          color: var(--base-foreground) !important;
          border-color: var(--border) !important;
        }

        /* ── 코드 블록 ── */
        .sbdocs-content code, .sbdocs-content pre,
        [class*="SyntaxHighlighter"] {
          background: var(--muted) !important;
          color: var(--base-foreground) !important;
        }

        /* ── Show code / 버튼 ── */
        [class*="ShowCode"] button,
        .sbdocs-content button:not([data-item-id]) {
          background: var(--secondary) !important;
          color: var(--secondary-foreground) !important;
          border-color: var(--border) !important;
        }

        /* ── ON THIS PAGE TOC 패널 ── */
        #__toc-panel__ {
          background: var(--background) !important;
          border-color: var(--border) !important;
        }
        #__toc-panel__ p { color: var(--muted-foreground) !important; }
        #__toc-panel__ ul { border-color: var(--border) !important; }
      `
      : "";

    // 3. 현재 모든 캔버스 iframe에 즉시 적용
    document.querySelectorAll<HTMLIFrameElement>("iframe").forEach((f) =>
      applyDarkToIframe(f, dark)
    );

    // 4. 이후 로드되는 iframe (lazy) 에도 적용 — DOM 추가 감시
    const iframeObserver = new MutationObserver((mutations) => {
      mutations.forEach((m) =>
        m.addedNodes.forEach((node) => {
          if ((node as HTMLElement).tagName === "IFRAME") {
            const f = node as HTMLIFrameElement;
            if (f.contentDocument?.readyState === "complete") {
              applyDarkToIframe(f, dark);
            } else {
              f.addEventListener("load", () => applyDarkToIframe(f, dark), { once: true });
            }
          }
        })
      );
    });
    iframeObserver.observe(document.body, { childList: true, subtree: true });

    // 5. 폴링: 캔버스 iframe re-render 대비
    const pollTimer = setInterval(() => {
      document.querySelectorAll<HTMLIFrameElement>("iframe").forEach((f) =>
        applyDarkToIframe(f, dark)
      );
    }, 1200);

    // 6. 다크 모드: .sbdocs-content 내 흰 배경 + 어두운 텍스트 요소를 직접 스캔해 덮어씌우기
    //    Storybook Emotion 클래스명은 해시라 CSS 셀렉터로 못 잡으므로 JS로 처리
    const patchWhiteEls = () => {
      const content = document.querySelector(".sbdocs-content");
      if (!content) return;

      // Pass 1: 흰 배경 → 다크 배경
      content.querySelectorAll<HTMLElement>("*").forEach((el) => {
        const bg = getComputedStyle(el).backgroundColor;
        const isWhite =
          bg === "rgb(255, 255, 255)" ||
          bg === "rgba(255, 255, 255, 1)" ||
          bg === "rgb(250, 250, 250)" ||
          bg === "rgb(248, 248, 248)";
        if (dark && isWhite) {
          el.dataset.origBg = el.style.background || "";
          el.style.setProperty("background", "oklch(0.2 0 0)", "important");
          el.style.setProperty("border-color", "oklch(1 0 0 / 10%)", "important");
        } else if (!dark && el.dataset.origBg !== undefined) {
          el.style.removeProperty("background");
          el.style.removeProperty("border-color");
          delete el.dataset.origBg;
        }
      });

      // Pass 2: 어두운 텍스트(≈ 검정) → 밝은 텍스트
      //         (배경이 다크로 바뀐 후 텍스트만 검정으로 남는 경우)
      content.querySelectorAll<HTMLElement>("*").forEach((el) => {
        if (dark) {
          const col = getComputedStyle(el).color;
          const rgb = col.match(/\d+/g)?.map(Number) ?? [255, 255, 255];
          const isDark = rgb[0] < 80 && rgb[1] < 80 && rgb[2] < 80;
          if (isDark) {
            el.dataset.origColor = el.style.color || "";
            el.style.setProperty("color", "oklch(0.88 0 0)", "important");
          }
        } else if (el.dataset.origColor !== undefined) {
          el.style.removeProperty("color");
          delete el.dataset.origColor;
        }
      });
    };

    // 최초 + 약간 지연 후 한 번 더 (lazy render 대비)
    patchWhiteEls();
    const patchTimer1 = setTimeout(patchWhiteEls, 600);
    const patchTimer2 = setTimeout(patchWhiteEls, 1500);

    return () => {
      iframeObserver.disconnect();
      clearInterval(pollTimer);
      clearTimeout(patchTimer1);
      clearTimeout(patchTimer2);
    };
  }, [theme]);

  // ── 방향: html/body 는 건드리지 않음 — 래퍼 div에만 적용
  // (dir 상태는 아래 DocsContainer 래퍼 div의 dir prop으로만 사용)

  // ── Copy Page
  const copyPage = () => {
    const content = document.querySelector(".sbdocs-content") as HTMLElement | null;
    if (!content) return;
    navigator.clipboard.writeText(content.innerText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // ── TOC 위치 계산
  const calcPos = () => {
    const content = document.querySelector<HTMLElement>(".sbdocs-content");
    if (!content) return;

    const contentRect = content.getBoundingClientRect();
    if (contentRect.right + 176 + 16 > window.innerWidth) return;

    const canvasEl =
      content.querySelector<HTMLElement>('[class*="Story"]') ??
      content.querySelector<HTMLElement>('[class*="story"]') ??
      content.querySelector<HTMLElement>('[class*="canvas"]') ??
      content.querySelector<HTMLElement>('[class*="Preview"]') ??
      (Array.from(content.children).find(
        (el) => el.tagName !== "H1" && el.tagName !== "P"
      ) as HTMLElement | undefined);

    const topRect = (canvasEl ?? content).getBoundingClientRect();
    setPos({ top: topRect.top, left: contentRect.right + 16, ready: true });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const content = document.querySelector(".sbdocs-content");
      if (!content) return;

      const elements = Array.from(content.querySelectorAll("h2, h3")) as HTMLElement[];

      const items: Heading[] = elements
        .map((el) => ({
          id: el.id,
          text: el.textContent?.trim() ?? "",
          level: Number(el.tagName.replace("H", "")),
        }))
        .filter((h) => h.id && h.text);

      setHeadings(items);
      setActiveId(items[0]?.id ?? "");
      calcPos();

      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible.length > 0) setActiveId(visible[0].target.id);
        },
        { rootMargin: "-8% 0% -80% 0%", threshold: 0 }
      );
      elements.forEach((el) => observerRef.current?.observe(el));
    }, 800);

    window.addEventListener("resize", calcPos);
    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
      window.removeEventListener("resize", calcPos);
    };
  }, [context]);

  // ── 다크모드 토큰
  const isDark = theme === "dark";
  const tk = {
    bg:          isDark ? "#1c1c1e" : "#ffffff",
    border:      isDark ? "#2e2e30" : "#f1f1f1",
    text:        isDark ? "#e4e4e7" : "#374151",
    textMuted:   isDark ? "#71717a" : "#a1a1aa",
    textActive:  isDark ? "#ffffff" : "#0f172a",
    inputBg:     isDark ? "#2a2a2e" : "#ffffff",
    inputBorder: isDark ? "#3f3f46" : "#e4e4e7",
    btnHoverBg:  isDark ? "#2a2a2e" : "#f9fafb",
    toggleOff:   isDark ? "#3f3f46" : "#d4d4d8",
    copiedBg:    isDark ? "#14532d" : "#f0fdf4",
    copiedBorder:isDark ? "#166534" : "#86efac",
    copiedText:  isDark ? "#86efac" : "#16a34a",
  };

  // ── 공통 스타일 헬퍼
  const toolbarBase: React.CSSProperties = {
    fontFamily: '"Pretendard Variable", Pretendard, "Segoe UI", -apple-system, sans-serif',
    fontSize: "13px",
    lineHeight: 1,
  };

  return (
    <>
      {/* ── Docs 툴바 ──────────────────────────────────────────── */}
      <div
        ref={toolbarRef}
        dir="ltr"
        style={{
          ...toolbarBase,
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: tk.bg,
          borderBottom: `1px solid ${tk.border}`,
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          height: "44px",
          transition: "background 0.2s ease, border-color 0.2s ease",
        }}
      >
        {/* Theme 드롭다운 */}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as "light" | "dark")}
            style={{
              ...toolbarBase,
              appearance: "none",
              WebkitAppearance: "none",
              padding: "5px 28px 5px 10px",
              border: `1px solid ${tk.inputBorder}`,
              borderRadius: "6px",
              backgroundColor: tk.inputBg,
              cursor: "pointer",
              color: tk.text,
              outline: "none",
              minWidth: "90px",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <span style={{ position: "absolute", right: "8px", pointerEvents: "none", color: tk.textMuted }}>
            {theme === "light" ? <SunIcon /> : <MoonIcon />}
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: "1px", height: "20px", backgroundColor: tk.inputBorder, margin: "0 8px" }} />

        {/* LTR / RTL 토글 */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{ ...toolbarBase, fontWeight: dir === "ltr" ? 600 : 400, color: dir === "ltr" ? tk.textActive : tk.textMuted, cursor: "pointer", userSelect: "none" }}
            onClick={() => setDir("ltr")}
          >
            LTR
          </span>
          <button
            onClick={() => setDir((d) => (d === "ltr" ? "rtl" : "ltr"))}
            style={{
              width: "40px", height: "22px", borderRadius: "11px", border: "none",
              cursor: "pointer",
              backgroundColor: dir === "rtl" ? "#0078d4" : tk.toggleOff,
              position: "relative", transition: "background 0.2s ease", padding: 0, flexShrink: 0,
            }}
            aria-label="Toggle direction"
          >
            <span
              style={{
                display: "block", width: "16px", height: "16px", borderRadius: "50%",
                backgroundColor: "#fff", position: "absolute", top: "3px",
                left: dir === "rtl" ? "21px" : "3px",
                transition: "left 0.2s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
              }}
            />
          </button>
          <span
            style={{ ...toolbarBase, fontWeight: dir === "rtl" ? 600 : 400, color: dir === "rtl" ? tk.textActive : tk.textMuted, cursor: "pointer", userSelect: "none" }}
            onClick={() => setDir("rtl")}
          >
            RTL
          </span>
        </div>

        {/* Copy Page 버튼 (우측 끝) */}
        <button
          onClick={copyPage}
          style={{
            ...toolbarBase,
            marginLeft: "auto",
            display: "flex", alignItems: "center", gap: "6px",
            padding: "5px 12px",
            border: `1px solid ${copied ? tk.copiedBorder : tk.inputBorder}`,
            borderRadius: "6px",
            backgroundColor: copied ? tk.copiedBg : tk.inputBg,
            cursor: "pointer", fontWeight: 500,
            color: copied ? tk.copiedText : tk.text,
            transition: "all 0.2s ease",
          }}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied!" : "Copy Page"}
        </button>
      </div>

      {/* ── 본문: dir은 이 래퍼에만 적용 (툴바는 항상 LTR) ─────── */}
      <div dir={dir}>
        <DocsContainer context={context}>{children}</DocsContainer>
      </div>

      {/* ── 우측 TOC 패널 ────────────────────────────────────────── */}
      {headings.length > 0 && pos.ready && (
        <aside
          id="__toc-panel__"
          style={{
            position: "fixed",
            top: pos.top,
            left: pos.left,
            width: "176px",
            maxHeight: `calc(100vh - ${pos.top}px - 8px)`,
            overflowY: "auto",
            padding: "0 12px 24px 16px",
            borderLeft: `1px solid ${isDark ? "oklch(1 0 0 / 10%)" : "#e4e4e7"}`,
            background: "transparent",
            fontFamily:
              '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            zIndex: 10,
          }}
        >
          <p
            style={{
              margin: "0 0 12px",
              fontSize: "11px",
              fontWeight: 700,
              color: isDark ? "oklch(0.6 0 0)" : "#a1a1aa",
              letterSpacing: "0.09em",
              textTransform: "uppercase",
            }}
          >
            On This Page
          </p>

          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            borderLeft: `1px solid ${isDark ? "oklch(1 0 0 / 10%)" : "#f4f4f5"}`,
          }}>
            {headings.map((h) => {
              const isActive = activeId === h.id;
              const defaultColor = isDark ? "oklch(0.55 0 0)" : "#71717a";
              const activeColor  = isDark ? "oklch(0.985 0 0)" : "#0f172a";
              const hoverColor   = isDark ? "oklch(0.8 0 0)" : "#27272a";
              return (
                <li key={h.id} style={{ marginLeft: "-1px" }}>
                  <a
                    href={`#${h.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(h.id)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    style={{
                      display: "block",
                      cursor: "pointer",
                      padding: "4px 12px",
                      paddingLeft: h.level === 3 ? "22px" : "12px",
                      textDecoration: "none",
                      fontSize: "13px",
                      lineHeight: 1.55,
                      color: isActive ? activeColor : defaultColor,
                      fontWeight: isActive ? 600 : 400,
                      borderLeft: `2px solid ${isActive ? "#0078d4" : "transparent"}`,
                      transition: "all 0.15s ease",
                      borderRadius: "0 4px 4px 0",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = hoverColor;
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = defaultColor;
                    }}
                  >
                    {h.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>
      )}
    </>
  );
}
