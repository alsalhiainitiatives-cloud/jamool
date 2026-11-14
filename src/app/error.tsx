"use client";

import { PageBody } from "@/components/layout/Shell";
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/States";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <PageBody className="py-20">
      <ErrorState
        title="حدث خطأ صغير"
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={reset}>حاول مرة أخرى</Button>
            <Button href="/" variant="soft">
              الرئيسية
            </Button>
          </div>
        }
      >
        زيزو يعمل على إصلاحه. جرّب مرة ثانية بعد قليل.
      </ErrorState>
    </PageBody>
  );
}
