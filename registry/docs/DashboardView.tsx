"use client";

import { Badge } from "@/bases/radix/components/ui/badge";
import { Button } from "@/bases/radix/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/bases/radix/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/bases/radix/components/ui/table";
import { BarChart3, TrendingUp, Users } from "lucide-react";

const STAT_CARDS = [
  {
    title: "Total Revenue",
    value: "₩45,231",
    change: "+20.1%",
    description: "vs last month",
    icon: BarChart3,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180",
    description: "vs last month",
    icon: Users,
  },
  {
    title: "Conversion",
    value: "12.5%",
    change: "+2.4%",
    description: "vs last month",
    icon: TrendingUp,
  },
];

const RECENT_ORDERS = [
  { id: "ORD-001", customer: "김철수", amount: "₩32,000", status: "완료" },
  { id: "ORD-002", customer: "이영희", amount: "₩18,500", status: "처리중" },
  { id: "ORD-003", customer: "박민수", amount: "₩52,300", status: "완료" },
  { id: "ORD-004", customer: "최지은", amount: "₩9,200", status: "대기" },
];

export function DashboardView() {
  return (
    <div
      className="sb-unstyled bg-background text-foreground min-h-screen"
      style={{
        padding: "var(--spacing-12)",
        fontFamily:
          '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <header style={{ marginBottom: "var(--spacing-12)" }}>
          <h1
            className="text-foreground"
            style={{
              fontSize: "var(--text-2xl-font-size)",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Dashboard
          </h1>
          <p
            className="text-muted-foreground"
            style={{
              fontSize: "var(--text-sm-font-size)",
              marginTop: "var(--spacing-2)",
            }}
          >
            대시보드 페이지 예시 — 토큰과 컴포넌트만 사용
          </p>
        </header>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "var(--spacing-6)",
            marginBottom: "var(--spacing-12)",
          }}
        >
          {STAT_CARDS.map(
            ({ title, value, change, description, icon: Icon }) => (
              <Card key={title} size="sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-muted-foreground text-sm font-medium">
                    {title}
                  </CardTitle>
                  <Icon
                    className="text-muted-foreground h-4 w-4"
                    style={{ color: "var(--muted-foreground)" }}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{value}</div>
                  <p className="text-muted-foreground text-xs">
                    <span className="text-primary">{change}</span> {description}
                  </p>
                </CardContent>
              </Card>
            ),
          )}
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>최근 주문</CardTitle>
              <CardDescription>최근 7일간 주문 내역</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              전체 보기
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>주문번호</TableHead>
                  <TableHead>고객</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_ORDERS.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "완료" ? "default" : "secondary"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
