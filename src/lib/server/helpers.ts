export const consoleError = (err:any) => {
  const stack = new Error().stack;
  
  const stackLines = stack?.split("\n") as string[];
  const callerLine = stackLines[2] || "";

  const match = callerLine.match(/at\s+(async\s+)?([^\s(]+)/);
  const functionName = match ? match[2] : "Origen desconocido";

  console.error(`\x1b[31m[ERROR EN: ${functionName}]\x1b[0m`);
  console.error('_______________________________')
  console.error(err);
};
