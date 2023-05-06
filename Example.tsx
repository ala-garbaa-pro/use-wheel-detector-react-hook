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
