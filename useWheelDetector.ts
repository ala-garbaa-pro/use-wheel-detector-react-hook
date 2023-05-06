import { useEffect, useState } from "react";

const useWheelDetector = () => {

  const [state, setState] = useState<{
    wheelDelta: number;
    isWheeled: boolean;
    isWheeling: boolean;
    actionRef: number;
  }>({
    wheelDelta: 0,
    isWheeled: false,
    isWheeling: false,
    actionRef: 0,
  });

  const { wheelDelta, isWheeled, isWheeling } = state;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleWheel = (event: WheelEvent) => {
      const { deltaY } = event;

      setState((prevState) => ({
        ...prevState,
        wheelDelta: prevState.wheelDelta + deltaY,
        isWheeling: true,
      }));

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          isWheeled: true,
          isWheeling: false,
        }));
      }, 500);
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!isWheeling && !isWheeled) {
      setState((prevState) => ({
        ...prevState,
        wheelDelta: 0,
      }));
    }
  }, [isWheeling, isWheeled]);

  useEffect(() => {
    if (!isWheeling && isWheeled) {
      setState((prevState) => ({
        ...prevState,
        actionRef: prevState.actionRef + wheelDelta / 400,
        wheelDelta: 0,
      }));
    }
  }, [isWheeled, wheelDelta, isWheeling]);

  return state;
};

export default useWheelDetector;
