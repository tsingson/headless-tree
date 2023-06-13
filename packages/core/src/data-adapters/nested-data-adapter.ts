import { DataAdapterConfig } from "./types";
import { ItemInstance } from "../types/core";
import { DropTarget } from "../features/drag-and-drop/types";
import { performItemsMove } from "../utils";

interface NestedDataAdapterProps<T> {
  rootItem: T;
  getItemId: (item: T) => string;
  getChildren: (item: T) => T[] | undefined;
  changeChildren?: (item: T, children: T[]) => void;
}

const createItemMap = <T>(
  props: NestedDataAdapterProps<T>,
  item: T,
  map: Record<string, T> = {}
) => {
  map[props.getItemId(item)] = item;
  props.getChildren(item)?.forEach((child) => {
    createItemMap(props, child, map);
  });
  return map;
};

export const nestedDataAdapter = <T = any>(
  props: NestedDataAdapterProps<T>
): DataAdapterConfig<T> => {
  const itemMap = createItemMap(props, props.rootItem);
  return {
    rootItemId: props.getItemId(props.rootItem),
    dataLoader: {
      getItem: (itemId) => itemMap[itemId],
      getChildren: (itemId) =>
        props.getChildren(itemMap[itemId])?.map(props.getItemId) ?? [],
    },
    // TODO move out as reusable utility for all dnd-related stuff
    onDrop: (items: ItemInstance<T>[], target: DropTarget<T>) => {
      if (!props.changeChildren) {
        return;
      }
      performItemsMove(items, target, (item, newChildren) => {
        props.changeChildren?.(
          item.getItemData(),
          newChildren.map((child) => child.getItemData())
        );
      });
    },
  };
};
