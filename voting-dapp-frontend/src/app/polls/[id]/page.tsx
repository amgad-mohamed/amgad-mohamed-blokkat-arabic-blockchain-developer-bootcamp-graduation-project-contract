// src/app/polls/[id]/page.tsx

import Poll from "@/components/Poll";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="bg-[#f7f5fe56] h-screen">
      <Poll pollId={id} />;
    </div>
  );
}
