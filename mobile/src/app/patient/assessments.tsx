import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { assessmentsApi, AssessmentQuestion, ScoreResponse } from '../../api/assessments';

export default function MobileAssessmentsScreen() {
  const router = useRouter();

  const [activeType, setActiveType] = useState<'phq9' | 'bdi' | 'hdrs'>('phq9');
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [qId: string]: number }>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [scoreResult, setScoreResult] = useState<ScoreResponse | null>(null);

  useEffect(() => {
    loadAssessment(activeType);
  }, [activeType]);

  const loadAssessment = async (type: 'phq9' | 'bdi' | 'hdrs') => {
    setLoading(true);
    setScoreResult(null);
    setAnswers({});
    setCurrentIndex(0);
    try {
      const data = await assessmentsApi.getQuestions(type);
      setQuestions(data.questions || []);
    } catch (err) {
      console.error('Error fetching assessment questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: string, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([qId, sc]) => ({
        question_id: qId,
        selected_option_score: sc
      }));
      const res = await assessmentsApi.submitScore(activeType, formattedAnswers);
      setScoreResult(res);
    } catch (err) {
      console.error('Error submitting assessment score:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const currentQ = questions[currentIndex];
  const isCurrentAnswered = currentQ ? answers[currentQ.id] !== undefined : false;

  return (
    <View className="flex-1 bg-background">
      {/* Editorial Header */}
      <View className="flex-row items-center px-4 pt-12 pb-3.5 border-b border-outline bg-background">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="w-8 h-8 rounded-full border border-outline bg-surface items-center justify-center mr-3"
        >
          <Ionicons name="arrow-back" size={16} color="#18181B" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-on-surface font-semibold text-base">Clinical Check-in</Text>
          <Text className="text-on-surface-variant text-xs">Standardized Psychological Screeners</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-5 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Type Selector Ribbon */}
        <View className="flex-row gap-2 mb-6">
          {[
            { id: 'phq9', label: 'PHQ-9 (Mood)' },
            { id: 'bdi', label: 'BDI (Depression)' },
            { id: 'hdrs', label: 'HDRS (Clinical)' }
          ].map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setActiveType(item.id as any)}
              className={`flex-1 py-2 rounded-xl border items-center ${
                activeType === item.id 
                  ? 'bg-primary border-primary' 
                  : 'bg-surface border-outline'
              }`}
            >
              <Text className={`text-xs font-medium ${activeType === item.id ? 'text-white' : 'text-on-surface'}`}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
          <View className="py-20 items-center justify-center">
            <ActivityIndicator size="small" color="#18181B" />
            <Text className="text-on-surface-variant text-xs mt-3">Loading diagnostic questions...</Text>
          </View>
        ) : scoreResult ? (
          /* Score Result View */
          <View className="bg-surface border border-outline rounded-2xl p-6">
            <View className="w-12 h-12 rounded-full bg-secondary-container border border-outline items-center justify-center mb-4">
              <Ionicons name="shield-checkmark-outline" size={24} color="#2E4B3E" />
            </View>

            <Text className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
              Assessment Outcome
            </Text>
            <Text className="text-2xl font-bold text-on-surface tracking-tight mb-2">
              {scoreResult.severity || 'Mild Indicator'}
            </Text>

            <View className="p-4 rounded-xl bg-surface-container border border-outline my-4">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-xs text-on-surface-variant font-medium">Recorded Clinical Score</Text>
                <Text className="text-base font-bold text-on-surface">
                  {scoreResult.score} / {scoreResult.max_score || 27}
                </Text>
              </View>
              <Text className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                {scoreResult.interpretation || 'Your score reflects current symptom intensity over the past two weeks. Share this summary with your therapist for personalized cognitive strategies.'}
              </Text>
            </View>

            <View className="flex-row gap-3 mt-4">
              <TouchableOpacity
                onPress={() => loadAssessment(activeType)}
                className="flex-1 py-3 bg-surface-container border border-outline rounded-xl items-center"
              >
                <Text className="text-xs font-semibold text-on-surface">Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/(tabs)/therapists')}
                className="flex-1 py-3 bg-primary rounded-xl items-center"
              >
                <Text className="text-xs font-semibold text-white">Discuss With Clinician</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : questions.length > 0 && currentQ ? (
          /* Question Progression View */
          <View>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Question {currentIndex + 1} of {questions.length}
              </Text>
              <Text className="text-xs font-medium text-secondary">
                {Math.round(((currentIndex + 1) / questions.length) * 100)}% Complete
              </Text>
            </View>

            {/* Progress Bar */}
            <View className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden mb-6">
              <View 
                className="h-full bg-primary rounded-full transition-all" 
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </View>

            {/* Question Text */}
            <View className="bg-surface border border-outline rounded-2xl p-6 mb-6">
              <Text className="text-base font-semibold text-on-surface leading-snug">
                {currentQ.question}
              </Text>
            </View>

            {/* Options */}
            <View className="flex-col gap-2.5 mb-8">
              {(currentQ.options || [
                { text: 'Not at all', score: 0 },
                { text: 'Several days', score: 1 },
                { text: 'More than half the days', score: 2 },
                { text: 'Nearly every day', score: 3 }
              ]).map((opt, oIdx) => {
                const isSelected = answers[currentQ.id] === opt.score;
                return (
                  <TouchableOpacity
                    key={oIdx}
                    onPress={() => handleSelectOption(currentQ.id, opt.score)}
                    className={`p-4 rounded-xl border flex-row items-center justify-between ${
                      isSelected 
                        ? 'bg-primary border-primary' 
                        : 'bg-surface border-outline'
                    }`}
                  >
                    <Text className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-on-surface'}`}>
                      {opt.text}
                    </Text>
                    <View className={`w-4 h-4 rounded-full border items-center justify-center ${isSelected ? 'border-white bg-white' : 'border-outline'}`}>
                      {isSelected && <View className="w-2 h-2 rounded-full bg-primary" />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Action Button */}
            <TouchableOpacity
              onPress={handleNext}
              disabled={!isCurrentAnswered || submitting}
              className={`w-full py-3.5 rounded-xl items-center ${
                isCurrentAnswered ? 'bg-primary' : 'bg-surface-container opacity-40'
              }`}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text className="text-white text-xs font-semibold">
                  {currentIndex === questions.length - 1 ? 'Complete Assessment' : 'Next Question →'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View className="py-12 items-center">
            <Text className="text-on-surface-variant text-xs">No questions loaded for this questionnaire.</Text>
          </View>
        )}

      </ScrollView>
    </View>
  );
}
