
import { useAtomValue } from "jotai";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { getSavePath } from "../actions/getSavePath";
import { saveTestQEsToPath } from "../actions/saveTestQEsToPath";
import { activeTestAtom } from "@/features/test-session";
import { canExportAtom } from "../state/canExportAtom";

export default function ExportDataButton() {
    const test = useAtomValue(activeTestAtom);
    const canExport = useAtomValue(canExportAtom);

    const handleClick = async () => {
        if (!test) return;
        try {
            const p = await getSavePath();
            if (p) {
                await saveTestQEsToPath(test.id, p);
                toast.success("Test data has been exported to csv");
            }
        } catch (e) {
            toast.error("Exporting table data failed")
            console.log(e);
            // TODO: log error
        }
    }

    return (
        <div className="mt-2">
            <Button 
                onClick={handleClick} 
                className="bg-blue-600"
                disabled={!canExport}>
                Export Data
            </Button>
        </div>
    );
}