"use client";

import {
  AdjustmentsHorizontalIcon,
  ArrowTopRightOnSquareIcon,
  BellAlertIcon,
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  Square3Stack3DIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";

import {
  CATEGORIES,
  type ComponentCategory,
  type ComponentItem,
  componentsData,
} from "./components-data";

// ─── Category Icon Map ───────────────────────────────────────────────────────

const CategoryIcon: Record<ComponentCategory, React.ElementType> = {
  Forms: AdjustmentsHorizontalIcon,
  Layout: RectangleGroupIcon,
  Navigation: RectangleStackIcon,
  Overlay: WindowIcon,
  Feedback: BellAlertIcon,
  Display: Square3Stack3DIcon,
};

const CategoryColor: Record<ComponentCategory, { bg: string; icon: string; border: string }> = {
  Forms:      { bg: "#eff6ff", icon: "#3b82f6", border: "#bfdbfe" },
  Layout:     { bg: "#f0fdf4", icon: "#22c55e", border: "#bbf7d0" },
  Navigation: { bg: "#faf5ff", icon: "#a855f7", border: "#e9d5ff" },
  Overlay:    { bg: "#fff7ed", icon: "#f97316", border: "#fed7aa" },
  Feedback:   { bg: "#fefce8", icon: "#eab308", border: "#fef08a" },
  Display:    { bg: "#f0f9ff", icon: "#0ea5e9", border: "#bae6fd" },
};

// ─── Status Badge ────────────────────────────────────────────────────────────

const STATUS_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  Stable:     { bg: "#f0fdf4", text: "#15803d", dot: "#22c55e" },
  New:        { bg: "#eff6ff", text: "#1d4ed8", dot: "#3b82f6" },
  Beta:       { bg: "#fefce8", text: "#a16207", dot: "#eab308" },
  Deprecated: { bg: "#fef2f2", text: "#b91c1c", dot: "#ef4444" },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.Stable;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      background: s.bg, color: s.text,
      fontSize: "11px", fontWeight: 500,
      padding: "2px 8px", borderRadius: "9999px",
      letterSpacing: "0.01em",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

// ─── Component Card ──────────────────────────────────────────────────────────

function ComponentCard({ item }: { item: ComponentItem }) {
  const [hovered, setHovered] = useState(false);
  const color = CategoryColor[item.category];

  return (
    <a
      href={item.path}
      className="sb-catalog-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        textDecoration: "none",
        color: "inherit",
        transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
        boxShadow: hovered ? "0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.06)" : "0 1px 2px 0 rgba(0,0,0,0.05)",
        cursor: "pointer",
        gap: "12px",
        ...(hovered && {
          borderColor: "#d1d5db",
          background: "#fafafa",
        }),
      }}
    >
      {/* Icon + Status */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: 40, height: 40, borderRadius: "10px",
          background: color.bg, border: `1px solid ${color.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {React.createElement(CategoryIcon[item.category], {
            style: { width: 20, height: 20, color: color.icon },
          })}
        </div>
        <StatusBadge status={item.status} />
      </div>

      {/* Name + description */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: "15px", fontWeight: 600,
          color: "#18181b",
          marginBottom: "6px",
          display: "flex", alignItems: "center", gap: "6px",
          textDecoration: "none",
        }}>
          {item.name}
          {hovered && (
            <ArrowTopRightOnSquareIcon style={{ width: 14, height: 14, color: "#a1a1aa", flexShrink: 0, opacity: 0.8 }} />
          )}
        </div>
        <p style={{
          margin: 0, fontSize: "13px",
          color: "#6b7280", lineHeight: 1.5,
          display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textDecoration: "none",
        }}>
          {item.description}
        </p>
      </div>
    </a>
  );
}

// ─── Filter Tab ──────────────────────────────────────────────────────────────

function FilterTab({
  label, count, active, onClick,
}: { label: string; count: number; active: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        padding: "6px 12px", borderRadius: "6px",
        border: "1px solid transparent",
        background: active ? "#18181b" : hovered ? "#f4f4f5" : "transparent",
        color: active ? "#fafafa" : hovered ? "#27272a" : "#71717a",
        fontSize: "13px", fontWeight: active ? 600 : 400,
        cursor: "pointer", transition: "all 0.1s ease",
        whiteSpace: "nowrap",
      }}
    >
      {label}
      <span style={{
        fontSize: "11px", fontWeight: 500,
        background: active ? "rgba(255,255,255,0.15)" : "#e4e4e7",
        color: active ? "rgba(255,255,255,0.8)" : "#71717a",
        padding: "1px 6px", borderRadius: "999px",
        minWidth: 20, textAlign: "center",
      }}>
        {count}
      </span>
    </button>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export function CatalogView() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | ComponentCategory>("All");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: componentsData.length };
    CATEGORIES.forEach((cat) => { counts[cat] = componentsData.filter((c) => c.category === cat).length; });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return componentsData.filter((item) => {
      const matchSearch = !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
      const matchCat = selectedCategory === "All" || item.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [search, selectedCategory]);

  const grouped = useMemo(() => {
    if (selectedCategory !== "All") return { [selectedCategory]: filtered };
    const map: Record<string, ComponentItem[]> = {};
    CATEGORIES.forEach((cat) => {
      const items = filtered.filter((c) => c.category === cat);
      if (items.length > 0) map[cat] = items;
    });
    return map;
  }, [filtered, selectedCategory]);

  return (
    <div className="sb-unstyled" style={{
      fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: "#ffffff", minHeight: "100vh",
      padding: "48px 48px 80px", boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ── Page Header (Introduction 부제목과 동일: 20px, 600, 아이콘/디바이더 없음) */}
        <div style={{ paddingBottom: "32px", marginBottom: "32px" }}>
          <h2 className="sb-docs-section-title" style={{ margin: "0 0 16px", fontSize: "20px", fontWeight: 600, color: "#71717a", letterSpacing: "0.08em" }}>
            Components
          </h2>
          <p style={{ margin: 0, fontSize: "14px", color: "#71717a", lineHeight: 1.6 }}>
            디자인 시스템에서 제공하는 모든 컴포넌트 목록입니다.
            현재 <strong style={{ color: "#27272a" }}>{componentsData.length}개</strong>의 컴포넌트가 {CATEGORIES.length}개 카테고리로 분류되어 있습니다.
          </p>
        </div>

        {/* ── Search */}
        <div style={{ position: "relative", marginBottom: "16px" }}>
          <MagnifyingGlassIcon style={{
            position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
            width: 16, height: 16, color: "#a1a1aa", pointerEvents: "none",
          }} />
          <input
            type="text"
            placeholder="컴포넌트 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", boxSizing: "border-box",
              padding: "9px 14px 9px 36px",
              fontSize: "14px",
              border: "1px solid #e4e4e7", borderRadius: "8px",
              background: "#fafafa", color: "#09090b",
              outline: "none", transition: "border-color 0.15s, box-shadow 0.15s",
              fontFamily: "inherit",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#a1a1aa";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,0,0,0.05)";
              e.currentTarget.style.background = "#ffffff";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#e4e4e7";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = "#fafafa";
            }}
          />
        </div>

        {/* ── Category Filters */}
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "36px" }}>
          <FilterTab label="All" count={categoryCounts["All"]} active={selectedCategory === "All"} onClick={() => setSelectedCategory("All")} />
          {CATEGORIES.map((cat) => (
            <FilterTab
              key={cat} label={cat}
              count={categoryCounts[cat] ?? 0}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            />
          ))}
        </div>

        {/* ── Results */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <ChatBubbleBottomCenterTextIcon style={{ width: 36, height: 36, color: "#d4d4d8", margin: "0 auto 12px" }} />
            <p style={{ color: "#a1a1aa", fontSize: "14px", margin: 0 }}>검색 결과가 없습니다.</p>
          </div>
        ) : (
          Object.entries(grouped).map(([category, items]) => {
            const color = CategoryColor[category as ComponentCategory];
            const Icon = CategoryIcon[category as ComponentCategory];
            return (
              <div key={category} style={{ marginBottom: "48px" }}>
                {/* Section header (아이콘/디바이더 제거, Introduction 부제목 스타일) */}
                <h2 className="sb-docs-section-title" style={{ margin: "0 0 16px", fontSize: "20px", fontWeight: 600, color: "#71717a", letterSpacing: "0.08em" }}>
                  {category} <span style={{ fontSize: "14px", fontWeight: 400, color: "#a1a1aa" }}>{items.length}</span>
                </h2>

                {/* Grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "16px",
                }}>
                  {items.map((item) => <ComponentCard key={item.id} item={item} />)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
