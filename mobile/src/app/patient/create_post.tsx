import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Switch, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreatePostScreen() {
  const router = useRouter();
  const [postContent, setPostContent] = useState('');
  const [allowComments, setAllowComments] = useState(true);
  const [incognitoMode, setIncognitoMode] = useState(false);
  const [activeAlias, setActiveAlias] = useState('bunny');
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!postContent.trim()) {
      Alert.alert('Error', 'Please enter some content to post.');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch('http://10.0.2.2:8000/general/community/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: postContent,
          is_anonymous: incognitoMode,
          has_trigger_warning: !allowComments, // loosely mapping for demo since there's no trigger warning toggle in UI
          group_id: ""
        })
      });

      if (response.ok) {
        Alert.alert('Success', 'Your post has been shared.', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        Alert.alert('Error', 'Failed to share post. Please try again later.');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const aliases = [
    { id: 'bunny', name: 'Friendly Bunny', icon: 'happy-outline' },
    { id: 'flower', name: 'Wild Flower', icon: 'rose-outline' },
    { id: 'cloud', name: 'Quiet Cloud', icon: 'cloud-outline' },
    { id: 'moon', name: 'Moon Seeker', icon: 'moon-outline' },
  ];

  return (
    <View className="flex-1 bg-[#fbf8ff]">
      {/* Top Navigation Bar */}
      <View className="flex-row justify-between items-center px-4 md:px-10 py-4 sticky top-0 z-50 bg-[#fbf8ff] border-b-[1.5px] border-ink-black">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center border-[1.5px] border-ink-black rounded-lg active:bg-surface-variant transition-colors">
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text className="font-headline-sm text-primary font-bold text-xl">SarvUday</Text>
        </View>
        <View className="hidden md:flex flex-row gap-8 items-center">
          <Text className="text-primary font-bold">New Post</Text>
          <Text className="text-on-surface-variant">Explore</Text>
          <Text className="text-on-surface-variant">Profile</Text>
        </View>
        <TouchableOpacity onPress={handlePost} disabled={loading} className="bg-primary border-[1.5px] border-ink-black rounded-lg px-6 py-2 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform flex-row items-center gap-2">
          {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text className="font-label-bold text-white font-bold">POST</Text>}
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView className="flex-1 px-4 md:px-10 py-6 md:py-12 max-w-4xl mx-auto w-full" contentContainerStyle={{ gap: 24, paddingBottom: 100 }}>
          
          {/* Page Title & Guidance Section */}
          <View className="flex-col gap-4">
            <Text className="font-display-lg text-ink-black font-bold text-3xl">Share Your Story</Text>
            <View className="bg-[#d9d9e6]/30 border-[1.5px] border-ink-black rounded-3xl p-6 flex-row gap-4 items-start">
              <View className="bg-[#fdd33f] p-2 border-[1.5px] border-ink-black rounded-xl">
                <Ionicons name="bulb" size={24} color="#1A1A1A" />
              </View>
              <View className="flex-1 flex-col gap-1">
                <Text className="font-label-bold text-ink-black font-bold text-sm">Guidelines for Kind Communication</Text>
                <Text className="font-body-md text-on-surface-variant text-sm">Remember, your words have weight. Share with honesty, listen with empathy, and keep this space safe for everyone. We moderate all content to maintain a supportive environment.</Text>
              </View>
            </View>
          </View>

          {/* Post Creation Form */}
          <View className="flex-col gap-6">
            
            {/* Large Text Area with Sticker Border */}
            <View className="relative">
              <View className="absolute inset-0 bg-ink-black rounded-[32px] translate-x-2 translate-y-2 z-0" />
              <View className="relative w-full min-h-[300px] bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 z-10 flex-col">
                <TextInput
                  className="flex-1 font-body-lg text-ink-black text-lg p-0"
                  multiline
                  placeholder="What's on your mind? Feel free to be yourself, anonymously..."
                  placeholderTextColor="#747687"
                  value={postContent}
                  onChangeText={setPostContent}
                  textAlignVertical="top"
                />
                <View className="flex-row justify-end gap-2 mt-4">
                  <TouchableOpacity className="p-2 border-[1.5px] border-ink-black rounded-full active:bg-surface-container transition-colors">
                    <Ionicons name="image-outline" size={24} color="#1A1A1A" />
                  </TouchableOpacity>
                  <TouchableOpacity className="p-2 border-[1.5px] border-ink-black rounded-full active:bg-surface-container transition-colors">
                    <Ionicons name="happy-outline" size={24} color="#1A1A1A" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Configuration Bento Grid */}
            <View className="flex-col md:flex-row gap-6 mt-4">
              
              {/* Alias Selection Card */}
              <View className="flex-1 bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 flex-col gap-4">
                <View className="flex-row items-center justify-between">
                  <Text className="font-label-bold text-ink-black font-bold">Choose your Alias</Text>
                  <Ionicons name="information-circle" size={20} color="#002da5" />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16 }}>
                  {aliases.map((alias) => (
                    <TouchableOpacity 
                      key={alias.id}
                      onPress={() => setActiveAlias(alias.id)}
                      className={`w-24 h-24 border-[1.5px] border-ink-black rounded-2xl flex-col items-center justify-center gap-2 transition-colors ${activeAlias === alias.id ? 'bg-[#fdd33f] shadow-[2px_2px_0px_0px_#1A1A1A]' : 'bg-[#fbf8ff]'}`}
                    >
                      <Ionicons name={alias.icon as any} size={32} color="#1A1A1A" />
                      <Text className="font-label-md text-ink-black text-[10px]">{alias.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Toggles & Meta Section */}
              <View className="flex-1 flex-col gap-4">
                
                {/* Toggle 1 */}
                <View className="bg-[#ffd9df]/20 border-[1.5px] border-ink-black rounded-[24px] p-6 flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 bg-white border-[1.5px] border-ink-black rounded-full items-center justify-center">
                      <Ionicons name="chatbubbles" size={20} color="#002da5" />
                    </View>
                    <Text className="font-label-bold text-ink-black font-bold">Allow Comments</Text>
                  </View>
                  <Switch
                    value={allowComments}
                    onValueChange={setAllowComments}
                    trackColor={{ false: '#e4e1e8', true: '#fdd33f' }}
                    thumbColor="#ffffff"
                  />
                </View>

                {/* Toggle 2 */}
                <View className="bg-[#ffdad6]/20 border-[1.5px] border-ink-black rounded-[24px] p-6 flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 bg-white border-[1.5px] border-ink-black rounded-full items-center justify-center">
                      <Ionicons name="eye-off" size={20} color="#002da5" />
                    </View>
                    <Text className="font-label-bold text-ink-black font-bold">Incognito Mode</Text>
                  </View>
                  <Switch
                    value={incognitoMode}
                    onValueChange={setIncognitoMode}
                    trackColor={{ false: '#e4e1e8', true: '#fdd33f' }}
                    thumbColor="#ffffff"
                  />
                </View>

                {/* Post Button (Mobile only/Visible) */}
                <TouchableOpacity onPress={handlePost} disabled={loading} className="md:hidden w-full bg-primary border-[1.5px] border-ink-black rounded-2xl py-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform items-center flex-row justify-center gap-2">
                  {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text className="text-white font-headline-sm font-bold text-lg">POST NOW</Text>}
                </TouchableOpacity>

              </View>

            </View>

          </View>

          {/* Preview Mockup Card */}
          <View className="mt-8 flex-col gap-4">
            <Text className="font-label-bold text-on-surface-variant font-bold uppercase tracking-widest text-xs">Feed Preview</Text>
            <View className="relative border-[1.5px] border-ink-black rounded-[32px] p-6 bg-white overflow-hidden">
              <View className="flex-row items-center gap-3 mb-6">
                <View className="w-12 h-12 bg-[#fdd33f] border-[1.5px] border-ink-black rounded-full items-center justify-center">
                  <Ionicons name="happy-outline" size={24} color="#1A1A1A" />
                </View>
                <View>
                  <Text className="font-label-bold text-ink-black font-bold">Friendly Bunny</Text>
                  <Text className="text-[12px] text-on-surface-variant">Just now • Mental Health</Text>
                </View>
              </View>
              
              <View className="h-3 w-3/4 bg-[#e4e1e8] rounded-full mb-3" />
              <View className="h-3 w-1/2 bg-[#e4e1e8] rounded-full mb-8" />
              
              <View className="flex-row gap-4">
                <View className="h-8 w-16 bg-[#d9d9e6]/40 border-[1.5px] border-ink-black rounded-full" />
                <View className="h-8 w-16 bg-[#d9d9e6]/40 border-[1.5px] border-ink-black rounded-full" />
              </View>

              {/* Overlay for "Preview Only" */}
              <View className="absolute inset-0 bg-white/40 items-center justify-center">
                <View className="bg-ink-black px-4 py-2 rounded-lg">
                  <Text className="text-white font-label-bold font-bold text-[12px]">PREVIEW MODE</Text>
                </View>
              </View>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Navigation (Mobile Only) */}
      <View className="md:hidden absolute bottom-0 left-0 w-full bg-[#fbf8ff] border-t-[1.5px] border-ink-black h-20 flex-row justify-around items-center px-4 z-50">
        <TouchableOpacity className="flex-col items-center justify-center" onPress={() => router.push('/patient/dashboard')}>
          <Ionicons name="home-outline" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-xs mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-[#fdd33f] border-[1.5px] border-ink-black rounded-xl px-4 py-1">
          <Ionicons name="add-circle" size={24} color="#715b00" />
          <Text className="font-label-md text-[#715b00] text-xs font-bold mt-1">Post</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center" onPress={() => router.push('/patient/ai_personality')}>
          <Ionicons name="chatbubbles-outline" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-xs mt-1">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center">
          <Ionicons name="person-outline" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-xs mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
