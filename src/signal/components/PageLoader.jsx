// SMPTE colour bars, as shown while a station searches for a signal
const BARS = ["#c0c0c0", "#c0c000", "#00c0c0", "#00c000", "#c000c0", "#c00000", "#0000c0"];
const STRIP = ["#0000c0", "#131313", "#c000c0", "#131313", "#00c0c0", "#131313", "#c0c0c0"];

export default function PageLoader({ text = 'Searching for signal...' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030308]">
      <div className="text-center w-[min(420px,86vw)]">
        <div className="aspect-[4/3] w-full flex flex-col shadow-[0_0_40px_rgba(54,241,205,0.25)]" aria-hidden="true">
          <div className="flex flex-[67]">
            {BARS.map((c) => <div key={c} className="flex-1" style={{ background: c }} />)}
          </div>
          <div className="flex flex-[8]">
            {STRIP.map((c, i) => <div key={i} className="flex-1" style={{ background: c }} />)}
          </div>
          <div className="flex flex-[25]">
            <div className="flex-[5]" style={{ background: "#00214c" }} />
            <div className="flex-[5]" style={{ background: "#ffffff" }} />
            <div className="flex-[5]" style={{ background: "#32006a" }} />
            <div className="flex-[13]" style={{ background: "#131313" }} />
          </div>
        </div>
        <p className="osd mt-5 text-2xl" role="status">
          {text}<span className="animate-blink" aria-hidden="true">_</span>
        </p>
      </div>
    </div>
  );
}
