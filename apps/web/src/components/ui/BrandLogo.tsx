export function BrandLogo({ className = 'h-11' }: { className?: string }) {
  return (
    <img
      src="/app_logo.webp"
      alt="Yantrix Labs"
      className={`${className} w-auto max-w-none object-contain select-none`}
      draggable={false}
    />
  );
}
