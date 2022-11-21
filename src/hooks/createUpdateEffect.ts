import { useRef } from "react";
import type { useEffect, useLayoutEffect } from "react";

type EffectHookType = typeof useEffect | typeof useLayoutEffect;

export const createUpdateEffect: (hook: EffectHookType) => EffectHookType =
  (hook) => (effect, deps) => {
    const isMounted = useRef(false);

    // for react-refresh 刷新时保证isMounted值为false
    hook(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);

    hook(() => {
      // 初次挂载时不执行，并将isMounted值设为true
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
        return effect();
      }
    }, deps);
  };

export default createUpdateEffect;
