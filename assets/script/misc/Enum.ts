export function enumMemberValues(enumType: object): ReadonlyArray<number> {
    const enumMemberValues: number[] = Object.keys(enumType)
    .map((k: any) => enumType[k])
    .filter((v: any) => typeof v === 'number').map(Number);

    return enumMemberValues;
}

export function enumMemberNames(enumType: object): ReadonlyArray<string> {
    const enumMemberNames: string[] = Object.keys(enumType)
    .map((k: any) => enumType[k])
    .filter((v: any) => typeof v === 'string')

    return enumMemberNames;
}
