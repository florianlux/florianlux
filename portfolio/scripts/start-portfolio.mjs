import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { checkPublication } from "./check-public-release.mjs";
import { fileURLToPath } from "node:url";

export function startArguments(args, isPublic = false, command = "start") {
  let hostProvided = false;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--hostname" || arg === "-H") {
      const host = args[++i];
      if (!host || host.startsWith("-") || (!isPublic && host !== "127.0.0.1")) throw new Error("Preview must bind to 127.0.0.1. Public access requires the release gate.");
      hostProvided = true;
    } else if (arg.startsWith("--hostname=") || arg.startsWith("-H=")) {
      throw new Error("Use an explicit --hostname argument.");
    } else if (arg.startsWith("-H")) {
      throw new Error("Unsupported hostname shorthand.");
    }
  }
  return [command, ...(hostProvided ? [] : ["--hostname", isPublic ? "0.0.0.0" : "127.0.0.1"]), ...args];
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  checkPublication();
  const require = createRequire(import.meta.url);
  const args = process.argv.slice(2);
  const development = args.includes("--development");
  const child = spawn(process.execPath, [require.resolve("next/dist/bin/next"), ...startArguments(args.filter(arg => arg !== "--development"), process.env.PORTFOLIO_PUBLICATION_MODE === "public" && !development, development ? "dev" : "start")], { stdio: "inherit", env: process.env });
  for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
  child.on("exit", (code, signal) => { process.exitCode = code ?? (signal ? 1 : 0); });
}
