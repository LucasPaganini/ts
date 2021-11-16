export const makeConstraint =
  <T>() =>
  <V extends T>(v: V): typeof v =>
    v
