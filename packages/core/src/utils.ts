export type NoInfer<T> = [T][T extends any ? 0 : never];

export const memo = <D extends readonly any[], R>(
  fn: (...args: [...D]) => R,
  deps: () => [...D]
) => {
  let value: R | undefined;
  let oldDeps: D | null = null;

  return () => {
    const newDeps = deps();

    if (!value) {
      value = fn(...newDeps);
      oldDeps = newDeps;
      return value;
    }

    const match =
      oldDeps &&
      oldDeps.length === newDeps.length &&
      !oldDeps.some((dep, i) => dep !== newDeps[i]);

    if (match) {
      console.log("MEMO MATCH", oldDeps, newDeps);
      return value;
    }

    value = fn(...newDeps);
    oldDeps = newDeps;
    return value;
  };
};

export const scrollIntoView = (element: Element | undefined | null) => {
  if (!element) {
    return;
  }

  if ((element as any).scrollIntoViewIfNeeded) {
    (element as any).scrollIntoViewIfNeeded();
  } else {
    const boundingBox = element.getBoundingClientRect();
    const isElementInViewport =
      boundingBox.top >= 0 &&
      boundingBox.left >= 0 &&
      boundingBox.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      boundingBox.right <=
        (window.innerWidth || document.documentElement.clientWidth);
    if (!isElementInViewport) {
      element.scrollIntoView();
    }
  }
};
