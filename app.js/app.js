export function sum(n1, n2) {
  if (typeof n1 === "number" && typeof n2 === "number") {
    return n1 + n2;
  }

  throw new Error("Only numbers are supported");
}
