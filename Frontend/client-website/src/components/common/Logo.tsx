import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/images/logo/logo_new.png"
        alt="TEXCLO"
        width={36}
        height={36}
        className="h-9 w-auto object-contain"
        unoptimized
        priority
      />
      <span className="text-xl font-bold tracking-wider text-gray-900">
        TEXCLO
      </span>
    </div>
  );
}
