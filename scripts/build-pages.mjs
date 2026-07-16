import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const nextCli = join(root, "node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, [nextCli, "build"], {
  cwd: root,
  env: { ...process.env, GITHUB_PAGES: "true" },
  stdio: "inherit",
});

child.on("exit", (code) => process.exit(code ?? 1));
