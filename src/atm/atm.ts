export default class ATM {
  private readonly amount: number
  private readonly notes: number[]

  constructor (amount: number, notes: number[]) {
    this.amount = amount
    this.notes = notes
  }

  private readonly row = (amount: number, args: number[]): any => {
    const result: string[] = []

    args.forEach(n => {
      if (amount >= n) {
        const count = Math.floor(amount / n)
        amount = amount % n
        result.push(`${count} notes of ${n}`)
      }
    })

    return amount > 0
      ? 'Sorry, you cannot withdraw that amount :('
      : result.join(', ')
  }

  combinations = (): string[] => {
    let notes = this.notes.sort((a, b) => b - a)
    const ans: string[] = []

    do {
      const resp = this.row(this.amount, notes)
      ans.push(resp)
      notes = notes.slice(1)
    } while (notes.length !== 0)

    // return ans.filter((n, i) => ans.indexOf(n) === i)
    return [...new Set(ans)]
  }
}
