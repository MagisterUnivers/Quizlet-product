'use client'

import { useState } from "react"

interface Props {
  questions: SingleQuiz,
  currentQuizNumber: number
  allQuizAmount: number
  isFinished: boolean
  amountOfRightQuiz: number
  onQuizChange: (quizNumber: number, isWasRight?: boolean, isFinished?: boolean) => void
}

export function Quiz({
  questions,
  currentQuizNumber,
  allQuizAmount,
  isFinished,
  amountOfRightQuiz,
  onQuizChange
}: Props): React.ReactNode {
  const [selectedAnswer, setSelectedAnswer] = useState<SingleQuizAnswer | null>(null)
  const [isAnswerSelected, setIsAnswerSelected] = useState<boolean>(false)

  function handleChangeSelectedAnswer(item: SingleQuizAnswer): void {
    setSelectedAnswer(item)
    setIsAnswerSelected(!isAnswerSelected)
  }

  if (isFinished) {
    return (
      <li className="p-[20px] bg-white m-2 flex flex-col gap-4 min-w-[628px]">
        <div>
          <h2 className="text-green-700 font-bold mb-2">Amount of Questions correct: {amountOfRightQuiz}</h2>
        </div>
      </li>
    )
  }

  return (
    <li className="p-[20px] bg-white m-2 flex flex-col gap-4 min-w-[628px]">
      <div className="border-b-[2px] border-b-zinc-300">
        <h2 className="text-green-700 font-bold mb-2">Question {currentQuizNumber} of {allQuizAmount}</h2>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-black font-semibold">{questions.question}</h1>
        <ul className="flex flex-col gap-3 justify-center items-center">
          {questions.answers.map((item) => (
            <button
              key={item.text}
              disabled={isAnswerSelected}
              className={`text-black p-3 w-full text-start rounded-md disabled:cursor-not-allowed ${selectedAnswer === item
                ? item.isCorrect
                  ? 'bg-green-500'
                  : 'bg-red-500'
                : 'bg-zinc-300'
                }`}
              onClick={() => handleChangeSelectedAnswer(item)}
            >{item.text}</button>
          ))}
        </ul>
        <div>
          <button
            title="To next question"
            disabled={!isAnswerSelected}
            className="p-1 bg-green-700 text-white font-semibold w-[80px] rounded-sm disabled:cursor-not-allowed"
            onClick={() => onQuizChange(currentQuizNumber, selectedAnswer?.isCorrect, currentQuizNumber === 3 && true)}
          >Next</button>
        </div>
      </div>
    </li>
  )
}