import React, { useState } from 'react'
import styles from './BalanceDropDown.module.css'
import { useDispatch } from 'react-redux';
import { addInitialBalance } from '../../store/slices/transactionsSlice';

interface Props {
  setOpen: (boolean:boolean) => void
}

export default function BalanceDropdown({setOpen}:Props) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0)

  const handleSubmit = () => {
    dispatch(addInitialBalance(amount))
    setOpen(false)
  }
  const handleChange = (event:React.BaseSyntheticEvent) => {
    setAmount(parseFloat(event.target.value))
    console.log(typeof(parseFloat(event.target.value)))
  }
  return (
      <div className={styles.main}>
        <label>
          Сумма:
          <input
            type="number"
            value={amount}
            onChange={handleChange}
            placeholder="Введите сумму"
          />
          <button onClick={handleSubmit}>Добавить</button>
        </label>
      </div>
  )
}
