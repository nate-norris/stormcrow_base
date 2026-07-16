import { useAtomValue } from "jotai";

import { FieldSet, FieldLegend, FieldGroup, Field, FieldLabel, 
    FieldDescription } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator"
import { activeTestAtom } from "@/features/test-session";
import DodicInput from "./DodicInput";
import LotInput from "./Lot/LotInput";
import QECountSpinner from "./QECountSpinner";
import QETypeSelector from "./QETypeSelector";
import AutoLog from "./AutoLog";
import LogQE from "./LogQE";
import { EmptyForm } from "./EmptyForm";

export function QEForm() {

    const test = useAtomValue(activeTestAtom);

    // do not display form if not test selected
    if (!test) {
        return (
            <div className="m-14">
                <EmptyForm />
            </div>
        );
    }

    return (
        <div className="m-8 mr-48 ml-24">
            <h2 className="text-center text-lg font-semibold">Current QE</h2>
            <FieldSet className="gap-3">
                <FieldLegend>Test</FieldLegend>
                <FieldDescription>{test ? test.name : ""}</FieldDescription>
                <FieldGroup className="gap-3">
                    <div className="grid grid-cols-3 gap-12">
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
                    <div className="grid grid-cols-3 gap-12">
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