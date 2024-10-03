import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, selectCount } from "./counterSlice";
import styles from "./Counter.module.css";

export const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div>
      <div className={styles.row}>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
      </div>
    </div>
  );
};
