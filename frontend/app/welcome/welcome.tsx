import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { Button } from "~/components/ui/button"
import { ValuePrompts } from "~/values/prompts"

export function Welcome() {
  return (
    <main className="pt-16 pb-4">
      <ValuePrompts />
    </main>
  );
}
