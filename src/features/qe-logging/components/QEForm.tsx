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

    // return (
    //     <div className="m-8 bg-red-500 h-40">TEST</div>
    // );

    return (
        <div className="rounded-lg bg-card text-card-foreground p-6 shadow-md">
            <h2 className="text-center text-lg font-semibold">Current QE</h2>
            {/* <FieldSet className="gap-3">
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
            </FieldSet> */}



            <div className="flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-12">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="qe-dodic" className="text-sm font-medium text-left">
                            DODIC
                        </label>
                        <DodicInput />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="qe-lot" className="text-sm font-medium">
                            LOT
                        </label>
                        <LotInput />
                    </div>
                </div>

                <hr className="border-border" />

                <div className="grid grid-cols-3 gap-12">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="qe-count" className="text-sm font-medium">
                            QE
                        </label>
                        <QECountSpinner />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="qe-type" className="text-sm font-medium">
                            QE Type
                        </label>
                        <QETypeSelector />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-12">
                    <div />

                    <div className="flex flex-col gap-1">
                        <AutoLog />
                        <p className="text-sm text-muted-foreground">
                            logging initiated from sound trigger
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <LogQE />
                    </div>
                </div>
            </div>



        </div>
    );
}