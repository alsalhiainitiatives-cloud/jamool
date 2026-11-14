import { PageBody } from "@/components/layout/Shell";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";

export default function NotFound() {
  return (
    <PageBody className="py-20">
      <EmptyState title="يبدو أننا ضللنا الطريق!" action={<Button href="/">العودة إلى الرئيسية</Button>}>
        هذه الصفحة غير موجودة. لا تقلق، جمّول يعرف طريق العودة.
      </EmptyState>
    </PageBody>
  );
}
