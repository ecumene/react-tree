import { useMemo, useCallback } from 'react';

export interface TreeConfig {
  getId?: (node: any) => any;
  getChildren?: (node: any) => any[];
  shouldFlattenCallback?: (node: any) => boolean;
}

export interface TreeNode {
  id?: any;
  value?: any;
  depth?: number;
  parent?: any;
  source?: any;
}

export default (
  source: any,
  {
    getChildren = (node) => node.children,
    getId = (node) => node.id,
    shouldFlattenCallback = (node: any) => node.children.length,
  }: TreeConfig = {}
): any[] => {
  if (!getChildren(source)) {
    throw new Error(
      'built-in getChildren returns falsy, please specify a correct getChildren'
    );
  }

  if (!getId(source)) {
    throw new Error(
      'built-in getId returns falsy, please specify a correct getId'
    );
  }

  let depth = 0;

  const toFinalNode = useCallback(
    ({
      value,
      depth = 0,
      id = getId(value),
      parent = null,
      source,
    }: TreeNode = {}): TreeNode => {
      return { id, depth, parent, value, source };
    },
    [getId]
  );

  const reduce = useCallback(
    (getChildren: any, node: any) => {
      depth++;
      return getChildren(node).reduce((accumulator: any, value: any): any[] => {
        accumulator.push(toFinalNode({ value, depth, parent: node }));
        if (shouldFlattenCallback(value)) {
          accumulator = accumulator.concat(reduce(getChildren, value));
        }
        return accumulator;
      }, []);
    },
    [depth, shouldFlattenCallback, toFinalNode]
  );

  const flattened = useMemo(
    () => [toFinalNode({ value: source }), ...reduce(getChildren, source)],
    [getChildren, reduce, source, toFinalNode]
  );

  return flattened;
};
