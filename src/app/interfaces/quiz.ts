export interface Answer {
    answer: string;
    selected: boolean;
    correct: boolean;

}

export interface Question {
    id: number;
    questionText: string;
    answers: Answer[];
    multipleAnswers?: boolean;
    correctIndex: number | number[];
    wt?: number;
    scored?: number;
    hasAnswered: boolean;// this is kind of duplicate but easy one
    isCorrect?: boolean;// true, if user has answered correctly
}
export interface Quiz {
    questions: Question[];
    hasWeight?: boolean;// befault is false
    hasNegativeMarking?: boolean; // default is false;
    totalWt?: number;
}

export interface QuestionJson {
    questionText: string;
    answers: string[];
    multipleAnswers?: boolean;
    correctIndex: number | number[];
    wt?: number;
}

export interface QuizJson {
    questions: QuestionJson[];
    hasWeight?: boolean;// befault is false
    hasNegativeMarking?: boolean; // default is false;
    totalWt?: number;
}

export interface Note {
    value: number;
    type?: 'success' | 'warning' | 'danger';
}
export interface SubmitResponse {
    totalQ: Note;
    totalWt: Note; //wt of all question = answered + not ansered both
    correctCount: Note;
    wrongCount: Note;
    totalAnswered?: Note;
    scoreInPercentage: Note;
    grade?: 'poor' | 'average' | 'good' | 'very good' | 'excellent' | 'super champ';
}



