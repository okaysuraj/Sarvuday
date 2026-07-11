import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../CustomButton';

interface CrisisAlertModalProps {
  visible: boolean;
  onClose: () => void;
}

export const CrisisAlertModal: React.FC<CrisisAlertModalProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-ink-black/60 justify-center items-center px-6">
        <View className="bg-surface w-full rounded-2xl overflow-hidden">
          
          <View className="bg-error p-6 items-center">
            <View className="w-16 h-16 rounded-full bg-on-error items-center justify-center mb-4">
              <Ionicons name="warning" size={32} color="#ba1a1a" />
            </View>
            <Text className="font-headline-md text-on-error text-2xl font-bold text-center">
              You're not alone.
            </Text>
          </View>

          <View className="p-6">
            <Text className="font-body-md text-on-surface-variant text-center mb-6">
              Our AI detected that you might be going through a very difficult time right now. There is immediate help available.
            </Text>

            <View className="gap-3">
              <TouchableOpacity className="bg-error-container py-4 rounded-xl flex-row justify-center items-center">
                <Ionicons name="call" size={20} color="#93000a" className="mr-2" />
                <Text className="font-headline-md text-on-error-container font-bold text-lg">Call Suicide Lifeline (988)</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="bg-surface-container-highest py-4 rounded-xl flex-row justify-center items-center border border-outline-variant">
                <Ionicons name="medical" size={20} color="#1b1b20" className="mr-2" />
                <Text className="font-headline-md text-on-surface font-bold text-base">Escalate to Therapist Now</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onClose} className="py-4 rounded-xl flex-row justify-center items-center mt-2">
                <Text className="font-headline-md text-outline font-bold text-base">I'm okay, dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
      </View>
    </Modal>
  );
};
