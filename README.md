# useWheelDetector React Hook

```js

Important Note: The actionRef value corresponds to different scroll or wheel actions as follows:

actionRef of -2 corresponds to a fast scroll or wheel up.
actionRef of -1 corresponds to a normal scroll or wheel up.
actionRef of 1 corresponds to a normal scroll or wheel down.
actionRef of 2 corresponds to a fast scroll or wheel down.

Please keep these associations in mind when working with the actionRef value.

```

# 🎥 Watch this demo video to see the `useWheelDetector` hook in action:


[![useWheelDetector React Hook](https://img.youtube.com/vi/6F3B8br4R6g/0.jpg)](https://www.youtube.com/watch?v=6F3B8br4R6g)

## [https://www.youtube.com/watch?v=6F3B8br4R6g](https://www.youtube.com/watch?v=6F3B8br4R6g)



This project is a React application that includes a custom hook called useWheelDetector. The useWheelDetector hook allows you to detect and track wheel events (scrolling) in your application. It provides information such as the accumulated wheel delta, whether a wheel event has occurred, whether a wheel event is currently happening, and a calculated reference value based on the wheel delta.

The example usage of the useWheelDetector hook is showcased in the App component, where the values retrieved from the hook are displayed. Additionally, there is a CalendarExample component that demonstrates the usage of the numberOfMonthToEdit value, calculated based on the actionRef, to display a date that is incremented by a certain number of months.

This project serves as a starting point for utilizing the useWheelDetector hook and integrating it into your React applications.



## Table of Contents

- [Example](#example)
- [Hook](#hook)
- [Contributing](#contributing)
- [License](#license)

## Example:


```javascript
import React from "react";
import moment from "moment";
import useWheelDetector from "./useWheelDetector";

const App = () => {
  const { wheelDelta, isWheeled, isWheeling, actionRef } =
    useWheelDetector();

  return (
    <div>
      wheelDelta: {wheelDelta} <br />
      isWheeling: {isWheeling ? "true" : "false"} <br />
      isWheeled: {isWheeled ? "true" : "false"} <br />
      actionRef: {Math.round(actionRef)} <br />
      <CalendarExample numberOfMonthToEdit={actionRef} />
    </div>
  );
};

export default App;




interface CalendarExampleProps {
  numberOfMonthToEdit: number;
}

const CalendarExample: React.FC<CalendarExampleProps> = ({
  numberOfMonthToEdit,
}) => {
  return (
    <div>
      {moment().add(numberOfMonthToEdit, "months").format("YYYY-MM-DD")}
    </div>
  );
};
```

## Hook:

```javascript

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

```


## Contributing

Contributions are welcome! If you have any suggestions, find a bug, or want to contribute in any way, please open an issue or submit a pull request.

## License

This project is licensed under the **MIT License**
