

export function prismaWrapper<Args, Result>(prismaFunction: (args: Args) => Result) {
  return (async (args: Args) => {
    try {
      const result = await prismaFunction(args);

      return result;
    } catch (error) {
      console.error(`👎 ${error}`);
      throw error;
    }
  });
}