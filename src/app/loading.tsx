import { LoadingState } from "@/components/ui/States";

export default function Loading() {
  return (
    <div className="container-page min-h-[50vh] py-20">
      <LoadingState label="جمّول يجهّز الصفحة…" />
    </div>
  );
}
