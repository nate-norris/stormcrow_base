import { useSetAtom } from "jotai";
import { FileQuestionMark } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { isTestModalOpenAtom } from "@/app-shell"

export function EmptyForm() {
  const setTestModalOpen = useSetAtom(isTestModalOpenAtom);
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileQuestionMark />
        </EmptyMedia>
        <EmptyTitle>No Test Session Selected</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t selected a test to log quality evaluations toward. 
          Get started by creating or continuing one.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button onClick={()=>setTestModalOpen(true)} variant="outline">Manage Tests</Button>
      </EmptyContent>
    </Empty>
  )
}