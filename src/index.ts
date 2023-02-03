import 'colors'
import inquirer from 'inquirer'
import { areNumbers, areValidNotes, isValidWithdrawal } from './helpers/generics'
import ATM from './atm/atm'

const question = [
  {
    type: 'input',
    name: 'args',
    message: 'Enter the arguments:\n',
    suffix: '* The first value is the amount to withdraw, and the others are the notes\n',
    validate (input: string) {
      return input.length !== 0 ? true : 'Please, enter correct arguments ...'
    }
  }
]

const readInput = async (): Promise<number[]> => {
  console.clear()
  const { args } = await inquirer.prompt(question)
  const values = args.split(' ')
  return values.map((value: string) => Number(value))
}

const main = async (): Promise<void> => {
  let args: number[] = await readInput()
  while (!areNumbers(args)) {
    question[0].suffix = `${'>>'.red} All arguments must be numbers:\n`
    args = await readInput()
  }

  const [amount, ...notes] = args

  if (!areValidNotes(notes)) {
    console.log(`${'>>'.red} Invalid notes :(\n`)
    return
  }

  if (!isValidWithdrawal(amount, notes)) {
    console.log(`${'>>'.red} Sorry, you can't withdraw that amount :(\n`)
    return
  }

  const atm = new ATM(amount, notes)
  const resp = atm.combinations()

  console.log(`\nYou have ${resp.length} possible combinations.`.green)
  console.table(resp)
}

void main()
