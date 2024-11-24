import React, { useState } from 'react'
import styles from './BalanceDropDown.module.css'
import { useDispatch } from 'react-redux';
import { addInitialBalance, minusInitialBalance } from '../../store/slices/transactionsSlice';

interface Props {
  setOpen: (boolean:boolean) => void
}

export default function BalanceDropdown({setOpen}:Props) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0)

  const handleAdd = () => {
    dispatch(addInitialBalance(amount))
    setOpen(false)
  }

  const handleMinus = () => {
    dispatch(minusInitialBalance(amount))
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
          <button onClick={handleAdd}>Добавить</button>
          <button style={{backgroundColor:'red'}} onClick={handleMinus}>Отнять</button>
        </label>
      </div>
  )
}
