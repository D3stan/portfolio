import { Github, Linkedin } from "lucide-react";
import { SOCIAL_GITHUB, SOCIAL_LINKEDIN } from "@/config";

export default function SocialButtons() {
  const base =
    "border-2 border-border p-2 flex items-center justify-center transition transform hover:-translate-y-1";
  const hover = "hover:bg-accent";

  return (
    <div className="flex gap-3">
      <a
        href={SOCIAL_GITHUB}
        target="_blank"
        rel="noreferrer"
        className={`${base} ${hover}`}
        aria-label="GitHub"
      >
        <Github className="w-5 h-5" />
      </a>
      <a
        href={SOCIAL_LINKEDIN}
        target="_blank"
        rel="noreferrer"
        className={`${base} ${hover}`}
        aria-label="LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </a>
    </div>
  );
}
