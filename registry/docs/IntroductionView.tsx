"use client";

import {
  ArrowPathIcon,
  CubeTransparentIcon,
  EyeIcon,
  HandRaisedIcon,
  PuzzlePieceIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const PRINCIPLES = [
  {
    Icon: ArrowPathIcon,
    en: "Consistency",
    ko: "일관성",
    desc: "모든 화면과 플랫폼에서 동일한 시각 언어와 인터랙션 패턴을 유지합니다.",
    color: { bg: "#eff6ff", border: "#bfdbfe", icon: "#3b82f6" },
  },
  {
    Icon: SparklesIcon,
    en: "Efficiency",
    ko: "효율성",
    desc: "재사용 가능한 컴포넌트로 반복적인 디자인·개발 작업을 줄입니다.",
    color: { bg: "#faf5ff", border: "#e9d5ff", icon: "#a855f7" },
  },
  {
    Icon: PuzzlePieceIcon,
    en: "Scalability",
    ko: "확장성",
    desc: "새로운 요구사항에 유연하게 대응할 수 있도록 확장 가능하게 설계됩니다.",
    color: { bg: "#f0fdf4", border: "#bbf7d0", icon: "#22c55e" },
  },
  {
    Icon: EyeIcon,
    en: "Clarity",
    ko: "명확성",
    desc: "직관적인 디자인으로 사용자의 인지 부하를 줄이고 명확한 커뮤니케이션을 지원합니다.",
    color: { bg: "#fff7ed", border: "#fed7aa", icon: "#f97316" },
  },
  {
    Icon: HandRaisedIcon,
    en: "Accessibility",
    ko: "접근성",
    desc: "WCAG 기준을 충족하는 포용적 디자인으로 모든 사용자를 지원합니다.",
    color: { bg: "#fefce8", border: "#fef08a", icon: "#eab308" },
  },
  {
    Icon: CubeTransparentIcon,
    en: "Flexibility",
    ko: "유연성",
    desc: "다양한 제품 요구에 맞게 조합·커스터마이징 가능한 컴포넌트를 제공합니다.",
    color: { bg: "#f0f9ff", border: "#bae6fd", icon: "#0ea5e9" },
  },
];

const STATS = [
  { value: "5", label: "Design Tokens" },
  { value: "54", label: "Components" },
  { value: "0", label: "Patterns" },
  { value: "0", label: "Pages" },
];

export function IntroductionView() {
  return (
    <div
      className="sb-unstyled"
      style={{
        fontFamily:
          '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        background: "#ffffff",
        minHeight: "100vh",
        padding: "48px 48px 80px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* ── Hero Banner */}
        <img
          src="/intro-banner.png"
          alt="Inventis Design System"
          style={{
            width: "100%", borderRadius: "12px",
            marginBottom: "48px", display: "block",
            border: "1px solid #f4f4f5",
          }}
        />

        {/* ── Goal */}
        <div style={{ paddingBottom: "32px", borderBottom: "1px solid #f4f4f5", marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <SparklesIcon style={{ width: 16, height: 16, color: "#71717a" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717a", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Goal
            </span>
          </div>
          <h2 style={{ margin: "0 0 14px", fontSize: "22px", fontWeight: 700, color: "#09090b", letterSpacing: "-0.02em" }}>
            왜 디자인 시스템이 필요한가
          </h2>
          <p style={{ margin: "0 0 10px", fontSize: "15px", color: "#52525b", lineHeight: 1.75 }}>
            In a context where the service is expanding rapidly and headcount is
            increasing, we aimed to implement a consistent UI/UX and enhance the
            efficiency of communications that occur repeatedly without clear
            guidelines.
          </p>
          <p style={{ margin: 0, fontSize: "14px", color: "#a1a1aa", lineHeight: 1.75 }}>
            서비스 성장과 조직 규모 확대에 따라 디자인 일관성을 유지하고, 뚜렷한
            기준이 없어 비효율적으로 반복되는 커뮤니케이션을 개선하기 위한 통합
            시스템입니다.
          </p>
        </div>

        {/* ── Principles */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <CubeTransparentIcon style={{ width: 16, height: 16, color: "#71717a" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717a", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Principles
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {PRINCIPLES.map(({ Icon, en, ko, desc, color }) => (
              <div
                key={en}
                style={{
                  padding: "20px", borderRadius: "12px",
                  border: "1px solid #f4f4f5", background: "#fafafa",
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: "8px",
                  background: color.bg, border: `1px solid ${color.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "14px",
                }}>
                  <Icon style={{ width: 18, height: 18, color: color.icon }} />
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "6px" }}>
                  <strong style={{ fontSize: "14px", fontWeight: 600, color: "#09090b" }}>{en}</strong>
                  <span style={{ fontSize: "12px", color: "#a1a1aa" }}>{ko}</span>
                </div>
                <p style={{ margin: 0, fontSize: "13px", color: "#71717a", lineHeight: 1.65 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats */}
        <div style={{ borderTop: "1px solid #f4f4f5", paddingTop: "40px" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px", background: "#f4f4f5",
            borderRadius: "12px", overflow: "hidden",
            border: "1px solid #f4f4f5",
          }}>
            {STATS.map(({ value, label }) => (
              <div key={label} style={{ background: "#ffffff", padding: "28px 24px", textAlign: "center" }}>
                <div style={{ fontSize: "32px", fontWeight: 700, color: "#09090b", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  {value}
                </div>
                <div style={{ fontSize: "12px", color: "#a1a1aa", marginTop: "6px", fontWeight: 500 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
