import { useEffect } from 'react';
import useApiData from '../../hooks/useApiData';
import { DataState } from '../common/DataState';
import styles from './ChatSidebar.module.css';

export default function ChatSidebar({ selectedRoom, setSelectedRoom, preSelectedRoomId }) {
  const state = useApiData('/chat/rooms');
  const rooms = state.data?.rooms || [];
  useEffect(() => {
    if (!selectedRoom && preSelectedRoomId && state.data?.rooms) {
      const room = state.data.rooms.find(item => item.room_id === preSelectedRoomId);
      if (room) setSelectedRoom(room);
    }
  }, [selectedRoom, preSelectedRoomId, state.data, setSelectedRoom]);
  return <DataState {...state}><ul className={styles.chatList}>{rooms.length ? rooms.map(room => <li key={room.room_id}><button className={styles.chatItem} aria-pressed={selectedRoom?.room_id === room.room_id} onClick={() => setSelectedRoom(room)}>{room.other_user_name || 'Conversation'}</button></li>) : <li>No saved conversations yet.</li>}</ul></DataState>;
}
