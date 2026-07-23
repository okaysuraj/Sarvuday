// src/pages/Assessments.jsx

import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import styles from './Assessments.module.css';

const Assessments = () => {
  const [assessmentType, setAssessmentType] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTool, setActiveTool] = useState('');

  const fetchQuestions = async (type) => {
    try {
      const res = await axiosInstance.get(`/assessments/${type}`);
      console.log('Fetched questions:', res.data.questions); // 🔍 Debug
      setAssessmentType(type);
      setQuestions(res.data.questions);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setScore(null);
      setErrorMessage('');
      setActiveTool(type);
    } catch (err) {
      console.error('Error fetching questions:', err);
    }
  };

  const handleOptionSelect = (questionId, selectedScore) => {
    const updated = [...answers];
    const index = updated.findIndex((a) => a.question_id === questionId);
    if (index > -1) {
      updated[index].selected_option_score = selectedScore;
    } else {
      updated.push({ question_id: questionId, selected_option_score: selectedScore });
    }
    setAnswers(updated);
    setErrorMessage('');
  };

  const handleNext = async () => {
    const current = questions[currentQuestionIndex];
    const selected = answers.find(a => a.question_id === current.id);

    if (!selected) {
      setErrorMessage('Please select an option before proceeding.');
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      try {
        const formattedAnswers = answers.map(answer => ({
          question_id: answer.question_id,
          selected_option_score: answer.selected_option_score
        }));
        
        const payload = { responses: formattedAnswers };

        // 🔍 Debug: Check payload structure
        console.log('Submitting payload:', JSON.stringify(payload, null, 2));

        const res = await axiosInstance.post(
          `/assessments/score/${assessmentType}`,
          payload
        );

        // Make sure we're getting a valid score object before setting it
        if (res.data && typeof res.data === 'object') {
          setScore(res.data);
        } else {
          console.error('Invalid score data received:', res.data);
          setErrorMessage('Received invalid score data from server.');
        }
      } catch (err) {
        console.error('Error submitting answers:', err);
        if (err.response) {
          console.error('Server responded with:', err.response.data);
          // Safely extract error message without directly using the error object
          const errorDetail = err.response.data?.detail 
            ? (typeof err.response.data.detail === 'string' 
                ? err.response.data.detail 
                : JSON.stringify(err.response.data.detail))
            : 'There was a problem submitting your answers.';
          setErrorMessage(errorDetail);
        } else if (err.request) {
          console.error('No response received:', err.request);
          setErrorMessage('No response from server. Please try again later.');
        } else {
          console.error('Unexpected error:', err.message);
          setErrorMessage('Unexpected error occurred. Please try again.');
        }
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setErrorMessage('');
    }
  };

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <div className={styles.assessmentContainer}>
      <h1>Mental Health Self Assessment Tools</h1>

      <div className={styles.toolsBtn}>
        <button
          onClick={() => fetchQuestions('bdi')}
          className={`${styles.toolBtn} ${activeTool === 'bdi' ? styles.activeTool : ''}`}
        >
          Beck Depression Inventory (BDI)
        </button>

        <button
          onClick={() => fetchQuestions('hdrs')}
          className={`${styles.toolBtn} ${activeTool === 'hdrs' ? styles.activeTool : ''}`}
        >
          Hamilton Depression Rating Scale (HDRS)
        </button>

        <button
          onClick={() => fetchQuestions('phq9')}
          className={`${styles.toolBtn} ${activeTool === 'phq9' ? styles.activeTool : ''}`}
        >
          Patient Health Questionnaire (PHQ9)
        </button>
      </div>


      {score && score.final_score !== undefined ? (
        <div className={styles.scoreResults}>
          <h3>Assessment Results</h3>
          <p>Final Score: {score.final_score} / {score.max_score || 'N/A'}</p>
          <p>Feedback: {score.result ? capitalize(score.result) : 'No feedback available'}</p>
          {score.score_breakdown && typeof score.score_breakdown === 'object' && (
            <div>
              <h4>Score Breakdown:</h4>
              <ul>
                {Object.entries(score.score_breakdown).map(([key, val]) => (
                  <li key={key}><strong>{capitalize(key)}</strong>: {val}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        questions.length > 0 && (
          <div className={styles.questionContainer}>
            <div className={styles.questionCounter}>
              {currentQuestionIndex + 1}/{questions.length}
            </div>
            <h5>{questions[currentQuestionIndex].question}</h5>

            <div className={styles.options}>
              {questions[currentQuestionIndex].options.map((option, idx) => {
                const isSelected = answers.some(
                  (a) =>
                    a.question_id === questions[currentQuestionIndex].id &&
                    a.selected_option_score === option.score
                );

                return (
                  <div key={idx} className={styles.option}>
                    <input
                      type="radio"
                      id={`q-${questions[currentQuestionIndex].id}-opt-${idx}`}
                      name={`question-${questions[currentQuestionIndex].id}`}
                      checked={isSelected}
                      onChange={() =>
                        handleOptionSelect(
                          questions[currentQuestionIndex].id,
                          option.score
                        )
                      }
                    />
                    <label htmlFor={`q-${questions[currentQuestionIndex].id}-opt-${idx}`}>
                      {option.text}
                    </label>
                  </div>
                );
              })}
            </div>

            {errorMessage && (
              <div className={styles.errorMsg}>
                <p>Error: {errorMessage}</p>
                <button 
                  onClick={() => setErrorMessage('')}
                  className={styles.dismissBtn}
                >
                  Dismiss
                </button>
              </div>
            )}

            <div className={styles.navigationBtns}>
              {currentQuestionIndex > 0 && (
                <button onClick={handlePrevious}>Previous</button>
              )}
              <button onClick={handleNext}>
                {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Assessments;
