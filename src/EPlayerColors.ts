enum EPlayerColor {
    White = "#FFFFFF",
    Red = "#FF0000",
    Green = "#008000",
    Blue = "#00AAFF",
    Yellow = "#FFFF00",
    Black = "#000000",
    Purple = "#B200FF",
    Orange = "#FF8C00",
    Grey = "#AAAAAA"
}
export type EPlayerColorStrings = keyof typeof EPlayerColor;
export const EPlayerColorReverseMap = new Map<EPlayerColor, string>(Object.keys(EPlayerColor).map(key => [EPlayerColor[key as keyof typeof EPlayerColor], key]));
export default EPlayerColor;