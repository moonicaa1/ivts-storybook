import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChevronRight, Download, Loader2, Mail, Trash2 } from "lucide-react";

import { Button } from "@/bases/radix/components/ui/button";

/**
 * Displays a button or a component that looks like a button.
 */
const meta: Meta<typeof Button> = {
  title: "Component/Button",
  component: Button,
  tags: ["!autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
      if: { arg: "variant", neq: "link" },
    },
    children: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  args: {
    variant: "default",
    size: "default",
    children: "Button",
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────────────────────
// Variant 스토리
// ─────────────────────────────────────────────────────────

/** 가장 강조도가 높은 주 액션 버튼입니다. 섹션당 하나의 CTA에만 사용하세요. */
export const Default: Story = {};

/** 경계선만 있는 보조 버튼입니다. 취소, 뒤로 가기 등 2차 플로우에 사용합니다. */
export const Outline: Story = {
  args: { variant: "outline" },
};

/** 배경과 경계선이 없는 최소한의 버튼입니다. 툴바, 메뉴 등에 사용합니다. */
export const Ghost: Story = {
  args: { variant: "ghost" },
};

/** 주 버튼을 보완하는 버튼입니다. 덜 강조된 지원 액션에 적합합니다. */
export const Secondary: Story = {
  args: { variant: "secondary" },
};

/** 되돌릴 수 없는 위험한 액션 전용입니다. 확인 다이얼로그와 함께 사용하세요. */
export const Destructive: Story = {
  args: { variant: "destructive" },
};

/** 텍스트만 있는 링크 스타일 버튼입니다. 3차 액션이나 네비게이션에 사용합니다. */
export const Link: Story = {
  args: { variant: "link" },
};

// ─────────────────────────────────────────────────────────
// State 스토리
// ─────────────────────────────────────────────────────────

/** 비동기 작업 진행 중 상태입니다. disabled와 함께 사용해 중복 제출을 방지하세요. */
export const Loading: Story = {
  render: (args) => (
    <Button {...args}>
      <Loader2 className="animate-spin" />
      저장 중...
    </Button>
  ),
  args: {
    variant: "outline",
    disabled: true,
  },
};

/** 아이콘은 레이블 앞(leading) 또는 뒤(trailing)에 배치할 수 있습니다. */
export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Mail /> 이메일 로그인
    </Button>
  ),
  args: { variant: "secondary" },
};

/** 인터랙션이 비활성화된 상태입니다. opacity-50이 적용되며 클릭이 차단됩니다. */
export const Disabled: Story = {
  args: { disabled: true },
};

// ─────────────────────────────────────────────────────────
// Size 스토리
// ─────────────────────────────────────────────────────────

/** 컴팩트한 폼, 사이드바, 드로어에 사용합니다. */
export const Small: Story = {
  args: { size: "sm" },
};

/** 히어로 CTA, 온보딩, 랜딩 페이지에 사용합니다. */
export const Large: Story = {
  args: { size: "lg" },
};

/** 아이콘 전용 — 표준 밀도. 반드시 aria-label을 제공하세요. */
export const Icon: Story = {
  args: {
    variant: "secondary",
    size: "icon",
    "aria-label": "이메일",
    children: <Mail />,
  },
};

/** 아이콘 전용 — 소형. */
export const IconSmall: Story = {
  args: {
    variant: "secondary",
    size: "icon-sm",
    "aria-label": "이메일",
    children: <Mail />,
  },
};

/** 아이콘 전용 — 대형. */
export const IconLarge: Story = {
  args: {
    variant: "secondary",
    size: "icon-lg",
    "aria-label": "이메일",
    children: <Mail />,
  },
};

// ─────────────────────────────────────────────────────────
// 접근성 예제
// ─────────────────────────────────────────────────────────

/**
 * 아이콘 전용 버튼에는 반드시 `aria-label`을 제공해야 합니다.
 * 스크린 리더 사용자에게 버튼의 목적을 알려줍니다.
 */
export const IconAccessible: Story = {
  name: "Icon (접근성 — aria-label 필수)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
      {/* ✅ aria-label 제공 */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Button size="icon" aria-label="이메일 전송">
          <Mail />
        </Button>
        <Button size="icon" aria-label="다운로드">
          <Download />
        </Button>
        <Button size="icon" variant="destructive" aria-label="삭제">
          <Trash2 />
        </Button>
      </div>
      <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
        텍스트 없는 아이콘 버튼 — aria-label 지정됨
      </span>
    </div>
  ),
  parameters: { layout: "centered" },
};

// ─────────────────────────────────────────────────────────
// RTL / 다국어 예제
// ─────────────────────────────────────────────────────────

/**
 * `dir="rtl"` 환경에서 아이콘과 레이블이 자동으로 미러링됩니다.
 */
export const RTLDirection: Story = {
  name: "RTL 방향 (아랍어)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "8px" }}>
          LTR (기본)
        </p>
        <Button>
          <Download /> Download
        </Button>
      </div>
      <div dir="rtl">
        <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "8px" }}>
          RTL — 아이콘이 오른쪽으로 자동 이동
        </p>
        <Button>
          <Download /> تنزيل
        </Button>
      </div>
    </div>
  ),
  parameters: { layout: "centered" },
};

/**
 * 고정 너비 컨테이너에서 긴 레이블을 말줄임(`truncate`)으로 처리합니다.
 */
export const TruncatedText: Story = {
  name: "말줄임 텍스트 (truncate)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
      <Button className="max-w-[160px]">
        <span className="truncate">매우 긴 버튼 레이블 텍스트입니다</span>
      </Button>
      <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
        max-w-[160px] + truncate 적용
      </span>
    </div>
  ),
  parameters: { layout: "centered" },
};

// ─────────────────────────────────────────────────────────
// 활용 예제 (Recipe)
// ─────────────────────────────────────────────────────────

/**
 * `asChild` prop으로 버튼 스타일을 유지하면서 `<a>` 앵커로 렌더링합니다.
 * Next.js에서는 `<Link>` 컴포넌트를 사용하세요.
 */
export const AsChildAnchor: Story = {
  name: "asChild — 앵커 태그로 렌더링",
  render: () => (
    <Button asChild>
      <a href="#">대시보드로 이동</a>
    </Button>
  ),
  parameters: { layout: "centered" },
};

/**
 * 비동기 제출 중 로딩 상태를 보여주는 패턴입니다.
 * 클릭하면 2초 후 완료됩니다.
 */
export const AsyncSubmit: Story = {
  name: "비동기 제출 (로딩 상태)",
  render: () => {
    const [loading, setLoading] = React.useState(false);
    const [done, setDone] = React.useState(false);

    const handleClick = async () => {
      setDone(false);
      setLoading(true);
      await new Promise((r) => setTimeout(r, 2000));
      setLoading(false);
      setDone(true);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <Button disabled={loading} aria-busy={loading} onClick={handleClick}>
          {loading && <Loader2 className="animate-spin" />}
          {loading ? "저장 중..." : done ? "✓ 저장 완료" : "변경 사항 저장"}
        </Button>
        {!loading && (
          <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
            클릭하면 2초 후 완료됩니다
          </span>
        )}
      </div>
    );
  },
  parameters: { layout: "centered" },
};

/**
 * 다이얼로그 하단의 주 액션 + 보조 액션 쌍 패턴입니다.
 * 가장 흔하게 사용되는 버튼 레이아웃입니다.
 */
export const ActionPair: Story = {
  name: "주 액션 + 보조 액션 쌍",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "8px",
        justifyContent: "flex-end",
        padding: "16px",
        border: "1px dashed var(--border)",
        borderRadius: "8px",
        width: "320px",
      }}
    >
      <Button variant="outline">취소</Button>
      <Button>확인</Button>
    </div>
  ),
  parameters: { layout: "centered" },
};

/**
 * 다음 화면으로 이동하는 네비게이션 버튼에 trailing 아이콘을 사용합니다.
 */
export const TrailingIcon: Story = {
  name: "Trailing 아이콘 (네비게이션)",
  render: () => (
    <Button variant="ghost">
      전체 보고서 보기
      <ChevronRight />
    </Button>
  ),
  parameters: { layout: "centered" },
};

/**
 * 되돌릴 수 없는 Destructive 액션은 반드시 확인 단계와 함께 제공하세요.
 */
export const DestructiveConfirm: Story = {
  name: "Destructive + 확인 패턴",
  render: () => {
    const [step, setStep] = React.useState<"idle" | "confirm" | "done">("idle");

    if (step === "done") {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "14px", color: "var(--muted-foreground)" }}>삭제가 완료됐습니다.</span>
          <Button variant="outline" size="sm" onClick={() => setStep("idle")}>
            초기화
          </Button>
        </div>
      );
    }

    if (step === "confirm") {
      return (
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "20px",
            width: "280px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>정말 삭제하시겠습니까?</p>
          <p style={{ fontSize: "13px", color: "var(--muted-foreground)", margin: 0 }}>
            이 작업은 되돌릴 수 없습니다.
          </p>
          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            <Button variant="outline" size="sm" onClick={() => setStep("idle")}>
              취소
            </Button>
            <Button variant="destructive" size="sm" onClick={() => setStep("done")}>
              삭제
            </Button>
          </div>
        </div>
      );
    }

    return (
      <Button variant="destructive" onClick={() => setStep("confirm")}>
        <Trash2 /> 계정 삭제
      </Button>
    );
  },
  parameters: { layout: "centered" },
};
