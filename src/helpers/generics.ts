export const areNumbers = (list: any[]): boolean => {
  return list.every(i => { return !isNaN(i) })
}

export const areValidNotes = (notes: number[]): boolean => {
  const validNotes: number[] = [5, 10, 20, 50, 100]
  return notes.every(i => validNotes.includes(i))
}

export const isValidWithdrawal = (amount: number, notes: number[]): boolean => {
  return amount > 0 ? notes.some(i => { return amount % i === 0 }) : false
}
