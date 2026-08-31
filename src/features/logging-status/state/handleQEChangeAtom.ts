// import { atom } from "jotai";

// import { loggingStatusAtom } from "./loggingStatusAtom";
// import { type QEChange } from "@/features/qe-table";



// export const handleQEChangeAtom = atom(
//     null,
//     (get, set, change: QEChange) => {
//         // type not correct for QEChange
//         if (!["inserted",  "reassigned", "deleted"].includes(change.type)) return;

//         const status = get(loggingStatusAtom);

//         // handle deletion of last qe to null
//         if (
//             change.type === "deleted" &&
//             status.qeCount === change.key.count &&
//             status.qeType === change.key.qeType
//         ) {
//             set(loggingStatusAtom, {
//                 qeCount: null,
//                 qeType: null,
//             });
//         }

//         if (
//             change.type === "reassigned" &&


//         ) {

//         }
//     }
// );