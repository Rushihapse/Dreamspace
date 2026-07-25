export default function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center bg-bg">
      <div className="h-10 w-10 animate-pulse rounded-full border border-gold/40 bg-gold/10" aria-hidden="true" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
