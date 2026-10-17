import Daily, { DailyMediaView } from '@daily-co/react-native-daily-js';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { PermissionsAndroid, Platform, Text, View } from 'react-native';
import { errorMessage, useApiResource } from '../../hooks/use-api-resource';
import { useAuthStore } from '../../store/authStore';
import { Action, RequestState, Screen } from '../common/Screen';

type Call = ReturnType<typeof Daily.createCallObject>;
export default function DailySession() {
  const params = useLocalSearchParams<{
    id?: string;
    sessionId?: string;
    type?: string;
  }>();
  const id = params.id || params.sessionId;
  const role = useAuthStore((state) => state.user?.role);
  const router = useRouter();
  const state = useApiResource(
    id
      ? `/${role === 'therapist' ? 'counsellor' : 'user'}/sessions/join/${encodeURIComponent(id)}`
      : null,
  );
  const callRef = useRef<Call | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [joined, setJoined] = useState(false);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(params.type === 'audio');
  useFocusEffect(
    useCallback(() => {
      let active = true;
      let call: Call | null = null;
      setJoined(false);
      setError('');
      setParticipants([]);
      const start = async () => {
        if (!state.data?.video_url || !state.data?.token) return;
        try {
          if (Platform.OS === 'android') {
            const permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];
            if (params.type !== 'audio') permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
            const granted = await PermissionsAndroid.requestMultiple(permissions);
            if (
              permissions.some(
                (permission) => granted[permission] !== PermissionsAndroid.RESULTS.GRANTED,
              )
            )
              throw new Error('Camera and microphone permission is required to join this session.');
          }
          if (!active) return;
          call = Daily.createCallObject();
          callRef.current = call;
          const refresh = () => {
            if (active && call) setParticipants(Object.values(call.participants()));
          };
          call
            .on('participant-joined', refresh)
            .on('participant-updated', refresh)
            .on('participant-left', refresh);
          call.on('error', (event) => {
            if (active) setError(event?.errorMsg || 'The video connection failed.');
          });
          call.on('left-meeting', () => {
            if (active) router.back();
          });
          await call.join({
            url: state.data.video_url,
            token: state.data.token,
          });
          if (params.type === 'audio') call.setLocalVideo(false);
          if (active) {
            setJoined(true);
            refresh();
          }
        } catch (cause) {
          if (active) setError(errorMessage(cause));
        }
      };
      void start();
      return () => {
        active = false;
        callRef.current = null;
        if (call) {
          void call.destroy().catch(() => {});
        }
      };
    }, [state.data, params.type, router]),
  );
  const local = participants.find((participant) => participant.local);
  const remote = participants.find((participant) => !participant.local);
  return (
    <Screen title="Video consultation" scroll={false}>
      <RequestState loading={state.loading} error={state.error || error} retry={state.reload} />
      {!id && (
        <View className="p-5">
          <Text className="text-on-surface">Select an appointment to join its consultation.</Text>
          <Action
            title="Your appointments"
            onPress={() => router.replace('/(tabs)/appointments')}
          />
        </View>
      )}
      {!!state.data && !state.error && !error && (
        <View className="flex-1 p-4 gap-4">
          <View className="flex-1 bg-surface-container rounded-2xl overflow-hidden items-center justify-center">
            {remote ? (
              <DailyMediaView
                videoTrack={remote.videoTrack}
                audioTrack={remote.audioTrack}
                mirror={false}
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <Text className="text-on-surface-variant">
                {joined ? 'Waiting for the other participant…' : 'Joining consultation…'}
              </Text>
            )}
          </View>
          {local && !videoOff && (
            <View className="h-32 w-24 rounded-xl overflow-hidden">
              <DailyMediaView
                videoTrack={local.videoTrack}
                audioTrack={null}
                mirror
                style={{ width: '100%', height: '100%' }}
              />
            </View>
          )}
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Action
                title={muted ? 'Unmute' : 'Mute'}
                disabled={!joined}
                onPress={() => {
                  callRef.current?.setLocalAudio(muted);
                  setMuted(!muted);
                }}
              />
            </View>
            <View className="flex-1">
              <Action
                title={videoOff ? 'Camera on' : 'Camera off'}
                disabled={!joined || params.type === 'audio'}
                onPress={() => {
                  callRef.current?.setLocalVideo(videoOff);
                  setVideoOff(!videoOff);
                }}
              />
            </View>
          </View>
          <Action
            title="Leave session"
            onPress={() => {
              if (joined) void callRef.current?.leave();
              else router.back();
            }}
          />
        </View>
      )}
    </Screen>
  );
}
