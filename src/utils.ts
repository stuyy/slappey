export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function checkOptionType(arg: any) {
  return ["new", "gen"].some((element) => element === arg);
}
