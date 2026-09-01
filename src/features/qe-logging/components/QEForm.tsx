import { FieldSet, FieldGroup, Field, FieldLabel, 
    FieldDescription } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator"
import { ActiveQECountSpinner, ActiveQETypeSelector } from "@/features/qe";
import { LoggingStatus } from "@/features/logging-status";
import DodicInput from "./DodicInput";
import LotInput from "./Lot/LotInput";
import AutoLog from "./AutoLog";
import LogQEButton from "./LogQEButton";


export function QEForm() {

  return (
    <div className="rounded-lg bg-card text-card-foreground p-6 shadow-md will-change-transform">
      <h2 className="text-center text-lg font-semibold pb-2">Current QE</h2>
      <FieldSet>
        <FieldGroup className="gap-3">
          <div className="grid grid-cols-[auto_1fr] gap-12">
            {/* DODIC selection */}
            <Field>
              <FieldLabel htmlFor="qe-dodic" className="ml-auto">DODIC</FieldLabel>
              <DodicInput />
            </Field>
            {/* Lot Selection */}
            <Field>
              <FieldLabel htmlFor="qe-lot" >LOT</FieldLabel>
              <LotInput />
            </Field>
          </div>
          <Separator />
          <div className="grid grid-cols-[auto_1fr] gap-12">
            {/* QE Count Selection */}
            <Field>
              <FieldLabel htmlFor="qe-count" >QE</FieldLabel>
              <ActiveQECountSpinner />
            </Field>
            {/* QE Type Selection */}
            <Field>
              <FieldLabel htmlFor="qe-type" >QE Type</FieldLabel>
              <ActiveQETypeSelector />
            </Field> 
          </div>
          <div className="grid grid-cols-3 gap-12">
            <div></div>
            {/* Auto Log Selection */}
            <Field>
              <AutoLog />
              <FieldDescription>sound trigger initiated</FieldDescription>
            </Field>
            {/* Log QE */}
            <Field>
              <LogQEButton />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
      <LoggingStatus />
    </div>
  );
}