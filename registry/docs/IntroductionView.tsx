"use client";

import {
  ArrowPathIcon,
  CubeTransparentIcon,
  EyeIcon,
  HandRaisedIcon,
  PuzzlePieceIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardContent,
} from "@/bases/radix/components/ui/card";
import React from "react";
import radixRegistry from "@/registry.radix.json";

type RegistryItem = {
  name: string;
  categories?: string[];
};

const registry = radixRegistry as { items: RegistryItem[] };

function getStats() {
  const items = registry.items ?? [];
  const tokens = items.filter(
    (i) => i.categories?.includes("design") && i.categories?.includes("tokens")
  ).length;
  const components = items.filter((i) => i.categories?.includes("ui")).length;
  const patterns = items.filter((i) => i.categories?.includes("pattern")).length;
  const pages = items.filter((i) => i.categories?.includes("page")).length;
  return [
    { value: String(tokens), label: "Design Tokens" },
    { value: String(components), label: "Components" },
    { value: String(patterns), label: "Patterns" },
    { value: String(pages), label: "Pages" },
  ];
}

const PRINCIPLES = [
  {
    Icon: ArrowPathIcon,
    en: "Consistency",
    ko: "일관성",
    desc: "모든 화면과 플랫폼에서 동일한 시각 언어와 인터랙션 패턴을 유지합니다.",
    token: "var(--base-chart-3)",
  },
  {
    Icon: SparklesIcon,
    en: "Efficiency",
    ko: "효율성",
    desc: "재사용 가능한 컴포넌트로 반복적인 디자인·개발 작업을 줄입니다.",
    token: "var(--base-chart-4)",
  },
  {
    Icon: PuzzlePieceIcon,
    en: "Scalability",
    ko: "확장성",
    desc: "새로운 요구사항에 유연하게 대응할 수 있도록 확장 가능하게 설계됩니다.",
    token: "var(--base-chart-2)",
  },
  {
    Icon: EyeIcon,
    en: "Clarity",
    ko: "명확성",
    desc: "직관적인 디자인으로 사용자의 인지 부하를 줄이고 명확한 커뮤니케이션을 지원합니다.",
    token: "var(--base-chart-5)",
  },
  {
    Icon: HandRaisedIcon,
    en: "Accessibility",
    ko: "접근성",
    desc: "WCAG 기준을 충족하는 포용적 디자인으로 모든 사용자를 지원합니다.",
    token: "var(--base-chart-4)",
  },
  {
    Icon: CubeTransparentIcon,
    en: "Flexibility",
    ko: "유연성",
    desc: "다양한 제품 요구에 맞게 조합·커스터마이징 가능한 컴포넌트를 제공합니다.",
    token: "var(--base-chart-1)",
  },
];

export function IntroductionView() {
  const STATS = React.useMemo(getStats, []);
  return (
    <div
      className="sb-unstyled bg-background text-foreground min-h-screen"
      style={{
        padding: "var(--spacing-12) var(--spacing-12) var(--spacing-20)",
        fontFamily:
          '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* ── Hero Banner */}
        <img
          src="/intro-banner.png"
          alt="Inventis Design System"
          style={{
            width: "100%",
            borderRadius: "var(--radius-xl)",
            marginBottom: "var(--spacing-6)",
            display: "block",
            border: "1px solid var(--base-border)",
          }}
        />

        {/* ── Stats (컴포넌트 갯수 카운터) */}
        <div style={{ marginBottom: "var(--spacing-12)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1px",
              background: "var(--base-border)",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              border: "1px solid var(--base-border)",
            }}
          >
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                style={{
                  background: "var(--base-background)",
                  padding: "var(--spacing-7) var(--spacing-6)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "var(--text-3xl-font-size)",
                    fontWeight: 700,
                    color: "var(--base-foreground)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div
                  className="text-muted-foreground"
                  style={{
                    fontSize: "var(--text-xs-font-size)",
                    marginTop: "var(--spacing-1)",
                    fontWeight: 400,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Goal */}
        <div
          style={{
            paddingBottom: "var(--spacing-8)",
            marginBottom: "var(--spacing-10)",
          }}
        >
          <h2
            className="sb-docs-section-title text-muted-foreground"
            style={{
              margin: "0 0 var(--spacing-7)",
              fontSize: "var(--text-xl-font-size)",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            Design System Goal
          </h2>
          <p
            className="text-muted-foreground"
            style={{
              margin: "0 0 var(--spacing-3)",
              fontSize: "var(--text-sm-font-size)",
              lineHeight: 1.9,
              fontWeight: 400,
            }}
          >
            In a context where the service is expanding rapidly and headcount is
            increasing, we aimed to implement a consistent UI/UX and enhance the
            efficiency of communications that occur repeatedly without clear
            guidelines.
          </p>
          <p
            className="text-muted-foreground"
            style={{
              margin: 0,
              fontSize: "var(--text-sm-font-size)",
              lineHeight: 1.9,
              fontWeight: 400,
            }}
          >
            서비스 성장과 조직 규모 확대에 따라 디자인 일관성을 유지하고, 뚜렷한
            기준이 없어 비효율적으로 반복되는 커뮤니케이션을 개선하기 위한 통합
            시스템입니다.
          </p>
        </div>

        {/* ── Principles (Card 컴포넌트 + 토큰 사용) */}
        <div style={{ marginBottom: "var(--spacing-12)" }}>
          <h2
            className="sb-docs-section-title text-muted-foreground"
            style={{
              margin: "0 0 var(--spacing-9)",
              fontSize: "var(--text-xl-font-size)",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            Principles
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "var(--spacing-3)",
            }}
          >
            {PRINCIPLES.map(({ Icon, en, ko, desc, token }) => (
              <Card key={en} size="sm">
                <CardContent
                  style={{
                    padding: "var(--spacing-5)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "var(--radius-md)",
                      background: `color-mix(in srgb, ${token} 15%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${token} 40%, transparent)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "var(--spacing-3)",
                    }}
                  >
                    <Icon style={{ width: 18, height: 18, color: token }} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "var(--spacing-1)",
                      marginBottom: "var(--spacing-1)",
                    }}
                  >
                    <strong
                      style={{
                        fontSize: "var(--text-sm-font-size)",
                        fontWeight: 600,
                        color: "var(--base-foreground)",
                      }}
                    >
                      {en}
                    </strong>
                    <span
                      className="text-muted-foreground"
                      style={{
                        fontSize: "var(--text-xs-font-size)",
                        fontWeight: 400,
                      }}
                    >
                      {ko}
                    </span>
                  </div>
                  <p
                    className="text-muted-foreground"
                    style={{
                      margin: 0,
                      fontSize: "var(--text-xs-font-size)",
                      lineHeight: 1.65,
                      fontWeight: 400,
                    }}
                  >
                    {desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
