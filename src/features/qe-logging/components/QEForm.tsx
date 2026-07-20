import { FieldSet, FieldGroup, Field, FieldLabel, 
    FieldDescription } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator"

import DodicInput from "./DodicInput";
import LotInput from "./Lot/LotInput";
import QECountSpinner from "./QECountSpinner";
import QETypeSelector from "./QETypeSelector";
import AutoLog from "./AutoLog";
import LogQE from "./LogQE";

export function QEForm() {

    return (
        <div className="rounded-lg bg-card text-card-foreground p-6 shadow-md will-change-transform">
            <h2 className="text-center text-lg font-semibold pb-2">Current QE</h2>
            <FieldSet className="gap-3">
                <FieldGroup className="gap-3">
                    <div className="grid grid-cols-[auto_1fr] gap-12">
                        <Field>
                            <FieldLabel htmlFor="qe-dodic" className="ml-auto">DODIC</FieldLabel>
                            <DodicInput />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="qe-lot" >LOT</FieldLabel>
                            <LotInput />
                        </Field>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-[auto_1fr] gap-12">
                        <Field>
                            <FieldLabel htmlFor="qe-count" >QE</FieldLabel>
                            <QECountSpinner />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="qe-type" >QE Type</FieldLabel>
                            <QETypeSelector />
                        </Field>
                        
                    </div>
                    <div className="grid grid-cols-3 gap-12">
                        <div></div>
                        <Field>
                            <AutoLog />
                            <FieldDescription>logging initiated from sound trigger</FieldDescription>
                        </Field>
                        <Field>
                            <LogQE />
                        </Field>
                    </div>
                </FieldGroup>
            </FieldSet>
        </div>
    );
}