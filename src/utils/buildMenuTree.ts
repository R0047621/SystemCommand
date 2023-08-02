type U<T extends Record<string, any>> = T & { children: U<T>[] };
export function list2tree<T extends { id: number; parent_id: number }>(
  list: T[],
  parent_id = 0,
  res: U<T>[] = [],
) {
  for (const item of list) {
    if (item.parent_id === parent_id) {
      const copy = { ...item, children: [] };
      list2tree(list, item.id, copy.children);
      res.push(copy);
    }
  }
  return res;
}
