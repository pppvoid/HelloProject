export function enumMemberValues(enumType: object): ReadonlyArray<number> {
    const enumValues: number[] = Object.keys(enumType)
        .map((k: any) => enumType[k])
        .filter((v: any) => typeof v === "number")
        .map(Number);

    return enumValues;
}

export function enumMemberNames(enumType: object): ReadonlyArray<string> {
    const enumNames: string[] = Object.keys(enumType)
        .map((k: any) => enumType[k])
        .filter((v: any) => typeof v === "string");

    return enumNames;
}
