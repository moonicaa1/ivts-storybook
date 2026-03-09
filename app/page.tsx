import { Button } from "@/bases/radix/components/ui/button";
import { ButtonGroup } from "@/bases/radix/components/ui/button-group";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/bases/radix/components/ui/table";
import radixRegistry from "@/registry.radix.json";
import { RegistryItemRow } from "../components/registry_item_row";

type Registry = {
  items: Array<{
    name: string;
    title: string;
    description?: string;
    categories?: string[];
  }>;
};

const registryConfig = {
  label: "Radix UI",
  url: "https://registry.lloydrichards.dev/v3/radix/{name}.json",
  registry: radixRegistry as Registry,
  example: "button-story",
} as const;

const Home = () => {
  const exampleUrl = registryConfig.url.replace(
    "{name}.json",
    `${registryConfig.example}.json`,
  );
  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8">
      <main className="flex flex-1 flex-col gap-8">
        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold tracking-tight">
                Storybook Registry
              </h1>
              <p className="text-muted-foreground">
                A collection of stories for the components of Shadcn/ui
              </p>
            </div>
          </div>
          <div className="bg-muted/40 text-muted-foreground rounded-2xl border p-4 text-sm">
            <p className="text-foreground">
              <span className="font-bold">Getting started:</span> copy the
              matching setup below.
            </p>
            <div className="mt-3 grid gap-3">
              <div className="bg-background rounded-xl border p-3">
                <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                  components.json
                </p>
                <pre className="text-foreground mt-2 overflow-x-auto text-xs">
                  {`{
  // ...rest of your components.json
  "registries": {
    "@storybook": "${registryConfig.url}"
  }
}`}
                </pre>
              </div>
              <div className="bg-background rounded-xl border p-3">
                <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                  Install
                </p>
                <pre className="text-foreground mt-2 overflow-x-auto text-xs">
                  {`npx shadcn@latest add @storybook/${registryConfig.example}
npx shadcn@latest add ${exampleUrl}`}
                </pre>
              </div>
            </div>
          </div>
        </section>
        <Table className="table-fixed">
          <TableCaption>A list of all registry items</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-40">Name</TableHead>
              <TableHead className="w-20 text-center">JSON</TableHead>
              <TableHead className="w-20 text-center">Storybook</TableHead>
              <TableHead className="text-center">cmd</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-background border-b-0">
              <TableCell className="pt-8 text-xs uppercase">
                Component <span className="text-muted-foreground">Stories</span>
              </TableCell>
            </TableRow>
            {registryConfig.registry.items
              .filter(
                (item) => item.categories && item.categories.includes("ui"),
              )
              .map((item) => (
                <RegistryItemRow key={item.name} item={item} />
              ))}
            <TableRow className="hover:bg-background border-b-0">
              <TableCell className="pt-8 text-xs uppercase">
                Design System{" "}
                <span className="text-muted-foreground">Stories</span>
              </TableCell>
            </TableRow>
            {registryConfig.registry.items
              .filter(
                (item) => item.categories && item.categories.includes("design"),
              )
              .map((item) => (
                <RegistryItemRow key={item.name} item={item} />
              ))}
            <TableRow className="hover:bg-background border-b-0">
              <TableCell className="pt-8 text-xs uppercase">
                Misc. <span className="text-muted-foreground">Stories</span>
              </TableCell>
            </TableRow>
            {registryConfig.registry.items
              .filter(
                (item) =>
                  item.categories && item.categories.includes("utility"),
              )
              .map((item) => (
                <RegistryItemRow key={item.name} item={item} />
              ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
};

export default Home;
