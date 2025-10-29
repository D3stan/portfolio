export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        {/* Animated spinner with brutalist design */}
        <div className="inline-block border-4 border-black border-t-accent rounded-full w-16 h-16 animate-spin"></div>
        <p className="mt-4 font-mono font-bold text-lg">Loading...</p>
      </div>
    </div>
  );
}
