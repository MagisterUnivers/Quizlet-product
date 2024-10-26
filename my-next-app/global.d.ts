declare interface SingleQuiz {
  question: string
  answers: {
    text: string
    isCorrect: boolean
  }[]
}

declare interface SingleQuizAnswer {
  text: relative
  isCorrect: boolean
}
