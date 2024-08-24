import ServiceLogo from "@/public/images/service-logo.svg";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center select-none overflow-x-hidden">
      <ServiceLogo width={108} height={108} className="animate-blink" />
    </main>
  );
}
