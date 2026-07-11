import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Switch, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';
import { communityApi } from '../../api/community';

export default function CreatePostScreen() {
  const router = useRouter();
  const { groupId } = useLocalSearchParams();
  
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [hasTriggerWarning, setHasTriggerWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await communityApi.createPost({
        content,
        isAnonymous,
        hasTriggerWarning,
        groupId: groupId ? String(groupId) : undefined
      });
      Alert.alert('Posted', 'Your message has been shared with the community.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (e) {
      console.error('Failed to create post', e);
      Alert.alert('Error', 'Failed to share your post.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="close" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Create Post
        </Text>
        <TouchableOpacity 
          onPress={handleSubmit}
          disabled={!content.trim() || isLoading}
          className={`px-4 py-2 rounded-full ${content.trim() ? 'bg-primary' : 'bg-surface-variant'}`}
        >
          <Text className={`font-label-bold ${content.trim() ? 'text-on-primary' : 'text-on-surface-variant'}`}>
            Share
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <View className="flex-1 p-6">
          <TextInput
            className="flex-1 font-body-md text-on-surface text-lg min-h-[200px]"
            placeholder="Share what's on your mind. This is a safe space..."
            placeholderTextColor="#747687"
            multiline
            textAlignVertical="top"
            value={content}
            onChangeText={setContent}
            autoFocus
          />
        </View>

        <View className="p-6 border-t border-surface-variant bg-surface-container-highest">
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center flex-1 pr-4">
              <View className="w-10 h-10 rounded-full bg-surface-variant items-center justify-center mr-3">
                <Ionicons name="eye-off" size={20} color="#1b1b20" />
              </View>
              <View>
                <Text className="font-headline-md text-on-surface font-bold text-base">Post Anonymously</Text>
                <Text className="font-body-md text-on-surface-variant text-xs">Hide your name and avatar</Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: '#747687', true: '#002da5' }}
              thumbColor={isAnonymous ? '#ffffff' : '#f5f2f9'}
              onValueChange={setIsAnonymous}
              value={isAnonymous}
            />
          </View>

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center flex-1 pr-4">
              <View className="w-10 h-10 rounded-full bg-error-container items-center justify-center mr-3">
                <Ionicons name="warning" size={20} color="#ba1a1a" />
              </View>
              <View>
                <Text className="font-headline-md text-on-surface font-bold text-base">Add Trigger Warning</Text>
                <Text className="font-body-md text-on-surface-variant text-xs">Blur content for sensitive readers</Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: '#747687', true: '#ba1a1a' }}
              thumbColor={hasTriggerWarning ? '#ffffff' : '#f5f2f9'}
              onValueChange={setHasTriggerWarning}
              value={hasTriggerWarning}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
