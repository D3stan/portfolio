import SignalWave from "./SignalWave";

/**
 * Section heading styled as a broadcast caption: a channel number in
 * on-screen-display type, the title in wide glowing letters, and a signal
 * trace underneath.
 */
export default function SectionCaption({ channel, children }) {
  return (
    <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
      {channel && (
        <span className="osd text-lg sm:text-xl mb-1" aria-hidden="true">
          CH {String(channel).padStart(2, "0")}
        </span>
      )}
      <h2 className="caption text-2xl sm:text-3xl md:text-4xl pl-[0.32em]">
        {children}
      </h2>
      <SignalWave className="mt-3 w-48 sm:w-60 h-6" />
    </div>
  );
}
