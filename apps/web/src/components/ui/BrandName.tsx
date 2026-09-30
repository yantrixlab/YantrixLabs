export function BrandName({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={`uppercase ${className}`} aria-label="Yantrix Labs">
      <span className={dark ? 'text-white' : 'text-gray-900'}>YANTRIX</span>{' '}
      <span className="text-[#1f4fd8]">LABS</span>
    </span>
  );
}
