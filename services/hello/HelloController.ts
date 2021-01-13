
export const hello = async () => {
   return 'Hello From Express'
}

export const world =async (s: string) => {
  console.log(s);
  return `I received your POST request. This is what you sent me: ${s}`
}