import React from "react";
import { useState, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  }, []);

  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter(
      (question) => question.id !== deletedQuestion.id
    );
    setQuestions(updatedQuestions);
  }

  function handleupdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions);
  }

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
    console.log("In QuestionList:", newQuestion);
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <QuestionForm onAddQuestion={handleAddQuestion} />

      <ul className="questions">
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onUpdateQuestion={handleupdateQuestion}
            onDeleteQuestion={handleDeleteQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
