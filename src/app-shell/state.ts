import { atom } from "jotai";

// Test session configuration including adding, deleting or continuing
//    previous test sessions.
//
// TestModal can be revealed by:
// 1. On booting the test session should be selected
// 2. When the user selects the option from the app menu
// 3. When the user selects the option within the app views (after modal closed
//      on startup)
//
// TestModal can be hidden by:
// 1: Selecting outside of the modal
// 2: Selecting the exit button within the modal
// 3: Finilizing actions within the modal (New/Continue)
export const isTestModalOpenAtom = atom<boolean>(true);