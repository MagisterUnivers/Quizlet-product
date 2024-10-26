'use client'

import { Quiz } from "@/components/Quiz/Quiz"
import { mockQuiz } from "@/static/mockdata"
import { useState } from "react"

export default function Home() {
  const [currentQuiz, setCurrentQuiz] = useState<number>(0)
  const [amountOfRightQuiz, setAmountOfRightQuiz] = useState<boolean[]>([])
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false)

  function handleChangeCurrentQuiz(quizNumber: number, isWasRight?: boolean, isFinished?: boolean): void {
    setAmountOfRightQuiz(prev => isWasRight ? [...prev, isWasRight] : [...prev, false])
    if (isFinished) setIsQuizFinished(!isQuizFinished)
    setCurrentQuiz(quizNumber)
  }

  return (
    <>
      <header />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-green-800">
          <ul>
            {mockQuiz.map((item, index) => (
              <Quiz
                key={item.question}
                currentQuizNumber={index + 1}
                questions={item}
                allQuizAmount={mockQuiz.length}
                isFinished={false}
                amountOfRightQuiz={amountOfRightQuiz}
                onQuizChange={handleChangeCurrentQuiz}
              />
            ))[currentQuiz]}
          </ul>
          {
            isQuizFinished && (
              <Quiz
                currentQuizNumber={1}
                questions={mockQuiz[0]}
                allQuizAmount={mockQuiz.length}
                isFinished={true}
                amountOfRightQuiz={amountOfRightQuiz}
                onQuizChange={handleChangeCurrentQuiz}
              />
            )
          }
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center" />
      </div>
    </>
  )
}
