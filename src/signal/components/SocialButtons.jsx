import { Github, Linkedin } from "lucide-react";
import { SOCIAL_GITHUB, SOCIAL_LINKEDIN } from "@/config";

/** Flat tray icons that raise into Win95 buttons on hover */
export default function SocialButtons() {
  const base =
    "p-1.5 flex items-center justify-center text-black hover:shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#fff] active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#fff]";

  return (
    <div className="flex gap-1">
      <a href={SOCIAL_GITHUB} target="_blank" rel="noreferrer" className={base} aria-label="GitHub">
        <Github className="w-[18px] h-[18px]" />
      </a>
      <a href={SOCIAL_LINKEDIN} target="_blank" rel="noreferrer" className={base} aria-label="LinkedIn">
        <Linkedin className="w-[18px] h-[18px]" />
      </a>
    </div>
  );
}
