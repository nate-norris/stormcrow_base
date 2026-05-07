/*
TODO: 
this file is a work in progress for ammunition lot parsing.
Currently the approach was to use finite state machine to parse each index one at a time.

Moving forward the ParsedLot will need to be constantly updated and properly formatted
upon every key stroke.
*/


export const LotState = {
  MFR_1: "MFR_1",
  MFR_2: "MFR_2",
  MFR_3_OR_HYPHEN_OR_YEAR_1: "MFR_3_OR_HYPHEN_OR_YEAR_1",
  YEAR_1: "YEAR_1",
  YEAR_2: "YEAR_2",
  MONTH: "MONTH",
  INTERFIX: "INTERFIX",
//   MFR_DECISION: "MFR_DECISION",
//   MFR_3: "MFR_3",
//   
//   "IDENTIFIER_OR_HYPHEN
//   SERIAL: "SERIAL",
//   "SUFFIX_OPT1",
//   "SUFFIX_OPT2",
//   "SEQ_1",
//   "SEQ_2",
//   "SEQ_3",
//   "THEATER",
//   DONE: "DONE"
} as const;
export type LotState = typeof LotState[keyof typeof LotState];
// month of production allowed characters
const MONTH_CHARS = new Set([
  "A","B","C","D","E","F","G","H","J","K","L","M"
]);

// type TransitionResult = {
//   nextState: State;
//   text: string;
//   accepted: boolean;
//   autoInserted?: string;
// };

type TransitionResult = {
  text: string;
  accepted: boolean;
};

type ParsedLot = {
  manufacturer: string;
  productionYear: string;
  productionMonth: string;
  interfix: string;
  identifier: string;
  sequence: string;
  suffix: string;
  threater: string;
};

class LotDecoder {
    private raw: string = "";
    private updated: string = "";
    private state: LotState = LotState.MFR_1;
    private text: string = "";
    cursor: number = 0;

    push(char: string): TransitionResult {

        // TODO determine if was back step or forward
        // if back then go back in this.text and go to previous state
        //
        // determine only one char given
        
        const caps = char.trim().toUpperCase();
        if (caps === "") return this.reject(); 

        switch (this.state) {

            // manufacturer symbol; first char
            case LotState.MFR_1: {
                if (!LotDecoder.isAlphaNumeric(caps)) return this.reject();

                this.text += caps;
                this.state = LotState.MFR_2;
                return this.currentResult();
            }

            // manufacturer symbol; second char
            case LotState.MFR_2: {
                if (!LotDecoder.isAlphaNumeric(caps)) return this.reject();

                this.text += caps;
                this.state = LotState.MFR_3_OR_HYPHEN_OR_YEAR_1;
                return this.currentResult();
            }
            
            // manufacturer symbol or separator or year first char
            // can be alpha, numeric, or digit
            case LotState.MFR_3_OR_HYPHEN_OR_YEAR_1: {
                if (LotDecoder.isAlphaNumeric(caps)) { // last manufacturer
                    this.text += caps;
                    this.state = LotState.YEAR_1;
                } else if (LotDecoder.isHyphen(caps)) { // hyphen given
                    this.text += caps;
                    this.state = LotState.YEAR_1;

                } else {
                    return this.reject();
                }
                return this.currentResult();
            }

            // year; first char; always numeric
            case LotState.YEAR_1: {
                if (!LotDecoder.isDigit(caps)) return this.reject();

                this.text += caps;
                this.state = LotState.YEAR_2;
                return this.currentResult();
            }

            // year; second char; always numeric
            case LotState.YEAR_2: {
                if (!LotDecoder.isDigit(caps)) return this.reject();

                this.text += caps;
                this.state = LotState.MONTH;
                return this.currentResult();
            }

            case LotState.MONTH: {
              if (!MONTH_CHARS.has(caps)) return this.reject();

              this.text += caps;
              this.state = LotState.INTERFIX;
              return this.currentResult();
            }

            default:
                return this.reject();
        }
    }

    private reject(): TransitionResult {
        return { text: this.text, accepted: false };
    }

    private currentResult(): TransitionResult {
        return { text: this.text, accepted: true };
    }

    private static isAlphaNumeric(char: string): boolean {
      return LotDecoder.isAlpha(char) || LotDecoder.isDigit(char);
    }
    private static isAlpha(char: string): boolean {
        const c = char.charCodeAt(0);
        return c >= 65 && c <= 90;
    }

    private static isDigit(char: string): boolean {
        const c = char.charCodeAt(0);
        return c >= 48 && c <= 57;
    }

    private static isHyphen(char: string): boolean {
        return char === "-";
    }
}