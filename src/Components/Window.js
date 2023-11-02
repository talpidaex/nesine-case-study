import React from "react";
import useElementSize from "../Hooks/useElementSize";
import { throttle } from "lodash";
const Window = ({ children, rowHeight, gap, isVirtualizationEnabled }) => {
  const [containerRef, { height: containerHeight }] = useElementSize();
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const bufferedItems = 2;

  const visibleChildren = () => {
    if (!isVirtualizationEnabled)
      return children.map((child, index) =>
        React.cloneElement(child, {
          style: {
            position: "absolute",
            top: index * rowHeight + index * gap,
            height: rowHeight,
            left: 0,
            right: 0,
            lineHeight: `${rowHeight}px`,
          },
        })
      );
    const startIndex = Math.max(
      Math.floor(scrollPosition / rowHeight) - bufferedItems,
      0
    );
    const endIndex = Math.min(
      Math.ceil((scrollPosition + containerHeight) / rowHeight - 1) +
        bufferedItems,
      children.length - 1
    );

    return children.slice(startIndex, endIndex + 1).map((child, index) =>
      React.cloneElement(child, {
        style: {
          position: "absolute",
          top: (startIndex + index) * rowHeight + index * gap,
          height: rowHeight,
          left: 0,
          right: 0,
          lineHeight: `${rowHeight}px`,
        },
      })
    );
  };

  const onScroll = () => {
    throttle(
      (e) => {
        setScrollPosition(e.target.value);
      },
      50,
      { leading: false }
    );
  };

  return (
    <ul
      onScroll={onScroll}
      style={{
        overflowY: "scroll",
        position: "relative",
      }}
      ref={containerRef}
      className="container"
    >
      {visibleChildren}
    </ul>
  );
};
export default Window;
