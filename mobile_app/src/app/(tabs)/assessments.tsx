import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import apiClient from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../constants/theme';

interface Answer {
  question_id: string;
  selected_option_score: number;
}

interface Option {
  text: string;
  score: number;
}

interface Question {
  id: string;
  question: string;
  options: Option[];
}

interface ScoreResult {
  final_score: number;
  max_score: number;
  result: string;
}

export default function AssessmentsScreen() {
  const [assessmentType, setAssessmentType] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState<ScoreResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { userToken } = useAuth();

  const fetchQuestions = async (type: string) => {
    setLoading(true);
    try {
      const res = await apiClient.get(`/assessments/${type}`);
      setAssessmentType(type);
      setQuestions(res.data.questions);
      setCurrentIndex(0);
      setAnswers([]);
      setScore(null);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to load assessment.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: string, optionScore: number) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.question_id === questionId);
    if (existingIndex > -1) {
      newAnswers[existingIndex].selected_option_score = optionScore;
    } else {
      newAnswers.push({ question_id: questionId, selected_option_score: optionScore });
    }
    setAnswers(newAnswers);
  };

  const handleNext = async () => {
    const currentQ = questions[currentIndex];
    const hasAnswered = answers.find(a => a.question_id === currentQ.id);

    if (!hasAnswered) {
      Alert.alert('Wait!', 'Please select an option before continuing.');
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitAssessment();
    }
  };

  const submitAssessment = async () => {
    setLoading(true);
    try {
      const payload = { responses: answers };
      const config = userToken ? { headers: { Authorization: `Bearer ${userToken}` } } : {};
      
      const res = await apiClient.post(`/assessments/score/${assessmentType}`, payload, config);
      setScore(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert('Submission Failed', 'Could not submit your answers.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  // Display Score
  if (score) {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Assessment Complete!</Text>
          <Text style={styles.resultScore}>Score: {score.final_score} / {score.max_score || 'N/A'}</Text>
          <Text style={styles.resultFeedback}>{score.result}</Text>
          
          <TouchableOpacity style={styles.primaryButton} onPress={() => setScore(null)}>
            <Text style={styles.buttonText}>Take Another Assessment</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Display Quiz
  if (questions.length > 0) {
    const currentQ = questions[currentIndex];
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.progressText}>Question {currentIndex + 1} of {questions.length}</Text>
        <View style={styles.quizCard}>
          <Text style={styles.questionText}>{currentQ.question}</Text>
          
          {currentQ.options.map((opt, idx) => {
            const isSelected = answers.some(a => a.question_id === currentQ.id && a.selected_option_score === opt.score);
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.optionButton, isSelected && styles.selectedOption]}
                onPress={() => handleSelectOption(currentQ.id, opt.score)}
              >
                <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>{opt.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.navButtons}>
          {currentIndex > 0 && (
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setCurrentIndex(currentIndex - 1)}>
              <Text style={styles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {currentIndex < questions.length - 1 ? 'Next' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Display Tool Selection
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Self Assessment Tools</Text>
      <Text style={styles.subtitle}>Select a tool to begin your assessment.</Text>
      
      <TouchableOpacity style={styles.toolCard} onPress={() => fetchQuestions('bdi')}>
        <Text style={styles.toolTitle}>BDI</Text>
        <Text style={styles.toolDesc}>Beck Depression Inventory</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.toolCard} onPress={() => fetchQuestions('hdrs')}>
        <Text style={styles.toolTitle}>HDRS</Text>
        <Text style={styles.toolDesc}>Hamilton Depression Rating Scale</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.toolCard} onPress={() => fetchQuestions('phq9')}>
        <Text style={styles.toolTitle}>PHQ-9</Text>
        <Text style={styles.toolDesc}>Patient Health Questionnaire</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: Colors.light.background },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.light.background, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, color: Colors.light.text },
  subtitle: { fontSize: 16, color: Colors.light.textSecondary, marginBottom: 20 },
  toolCard: { backgroundColor: Colors.light.surface, padding: 20, borderRadius: 10, marginBottom: 15, elevation: 2, shadowColor: Colors.light.text, shadowOpacity: 0.1, shadowRadius: 5 },
  toolTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.light.primary },
  toolDesc: { fontSize: 14, color: Colors.light.textSecondary, marginTop: 5 },
  
  progressText: { fontSize: 16, fontWeight: 'bold', color: Colors.light.textSecondary, marginBottom: 10, textAlign: 'center' },
  quizCard: { backgroundColor: Colors.light.surface, padding: 20, borderRadius: 10, marginBottom: 20, elevation: 2 },
  questionText: { fontSize: 18, fontWeight: 'bold', color: Colors.light.text, marginBottom: 20 },
  optionButton: { padding: 15, borderWidth: 1, borderColor: Colors.light.border, borderRadius: 8, marginBottom: 10, backgroundColor: Colors.light.backgroundElement },
  selectedOption: { backgroundColor: Colors.light.primary, borderColor: Colors.light.primary },
  optionText: { fontSize: 16, color: Colors.light.text },
  selectedOptionText: { color: Colors.light.onPrimary, fontWeight: 'bold' },
  
  navButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  primaryButton: { backgroundColor: Colors.light.primary, padding: 15, borderRadius: 8, alignItems: 'center', flex: 1, marginLeft: 5 },
  buttonText: { color: Colors.light.onPrimary, fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: Colors.light.surface, borderWidth: 1, borderColor: Colors.light.primary, padding: 15, borderRadius: 8, alignItems: 'center', flex: 1, marginRight: 5 },
  secondaryButtonText: { color: Colors.light.primary, fontSize: 16, fontWeight: 'bold' },
  
  resultCard: { backgroundColor: Colors.light.surface, padding: 30, borderRadius: 10, alignItems: 'center', width: '100%', elevation: 3 },
  resultTitle: { fontSize: 22, fontWeight: 'bold', color: Colors.light.success, marginBottom: 15 },
  resultScore: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: Colors.light.text },
  resultFeedback: { fontSize: 16, color: Colors.light.textSecondary, textAlign: 'center', marginBottom: 30 }
});
