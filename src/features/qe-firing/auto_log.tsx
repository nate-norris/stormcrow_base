import { useAtom } from "jotai";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { autoLogAtom } from "@/state/logQEAtom";

export default function AutoLog() {
    const [autoLog, setAutoLog] = useAtom(autoLogAtom);

    return (
        <Field orientation="horizontal" className="max-w-sm">
        <FieldContent>
            <FieldLabel htmlFor="switch-focus-mode">
            Auto Log QE
            </FieldLabel>
            <FieldDescription>
            Logging initiated from remote sound trigger notification.
            </FieldDescription>
        </FieldContent>
        <Switch 
            id="switch-focus-mode"
            checked={autoLog}
            onCheckedChange={setAutoLog}
        />
        </Field>
    )
}