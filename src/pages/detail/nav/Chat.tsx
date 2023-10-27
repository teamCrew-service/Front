import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import icons from '../../../assets/icons';
import type { MemberDetail } from '../../../assets/interfaces';
import '../style.css';

interface Message {
  user: string;
  message: string;
  time: Date;
  thumbnail: string;
  location: string;
}

// 서버 → 클라이언트 전송 인터페이스(받는 메시지)
interface ServerToClient {
  noArg: () => void;
  message: (userId: number, content: string) => void;
}

// 클라이언트 → 서버 전송 인터페이스(보내는 메시지)
interface ClientToServer {
  noArg: () => void;
  sendMessage: (roomId: number, userId: number, content: string) => void;
}

// messages: 이전 메시지와 새로 생성될 메시지 state
// message: 작성 중 또는 socket으로 전송 할 메시지
// socket: socket 연결 객체
function Chat({ crewInfo }: { crewInfo: MemberDetail }): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([
    {
      user: 'user1',
      message: 'Hello, how are you?',
      time: new Date(2023, 0, 3, 13, 22, 41),
      thumbnail:
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
      location: 'New York, NY',
    },
    {
      user: '주니',
      message: 'Hello, how are you?',
      time: new Date(2023, 0, 3, 13, 22, 42),
      thumbnail:
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
      location: '동네이름',
    },
    {
      user: 'user1',
      message: 'Hello, how are you?',
      time: new Date(2023, 0, 3, 13, 22, 43),
      thumbnail:
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
      location: 'New York, NY',
    },
    {
      user: '가나다',
      message: "I'm good, thank you! How about you?",
      time: new Date(2023, 0, 3, 13, 23, 15),
      thumbnail:
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
      location: '강남',
    },
    {
      user: 'user2',
      message: "I'm good, thank you! How about you?",
      time: new Date(2023, 0, 3, 13, 23, 17),
      thumbnail:
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
      location: 'Los Angeles, CA',
    },
    {
      user: 'user2',
      message: "I'm good, thank you! How about you?",
      time: new Date(2023, 0, 3, 13, 23, 20),
      thumbnail:
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
      location: 'Los Angeles, CA',
    },
    {
      user: 'user1',
      message: "I'm doing well, thanks!",
      time: new Date(2023, 0, 3, 13, 24, 9),
      thumbnail:
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
      location: 'New York, NY',
    },
    {
      user: '크루',
      message: 'Great to hear. Do you have any plans for the weekend?',
      time: new Date(2023, 0, 3, 13, 26, 30),
      thumbnail:
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
      location: '천안',
    },
    {
      user: 'user1',
      message: 'Not yet, still figuring it out. You?',
      time: new Date(2023, 0, 4, 14, 23, 15),
      thumbnail:
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
      location: 'New York, NY',
    },
    {
      user: 'user2',
      message: 'I might go hiking if the weather is nice.',
      time: new Date(2023, 0, 4, 15, 23, 15),
      thumbnail:
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
      location: 'Los Angeles, CA',
    },
  ]);

  // "message" 채팅 입력 state, handler
  const [message, setMessage] = useState('');
  const messageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  const [socket, setSocket] = useState<Socket>();

  // 페이지 로딩 시 실행 hook
  useEffect(() => {
    // messages를 시간에 따라 재정렬
    setMessages([...messages].sort((a, b) => a.time.getTime() - b.time.getTime()));

    // Socket 연결 객체 생성
    const socketIO: Socket<ServerToClient, ClientToServer> = io(process.env.REACT_APP_SERVER_URL as string);

    // Socket 객체를 State로 저장
    setSocket(socketIO);

    // 소켓 연결 된 경우, joinRoom 이벤트 emit
    if (socket !== null || socket !== undefined) {
      // 임시 roomId, userId 사용자와 모임 정보를 상위 컴포넌트에서 가져와야 함
      socket?.emit('joinRoom', { roomId: 56, userId: 9 });
    }

    // 페이지 언마운트 시 소켓 연결 해제
    return () => {
      if (socket !== null || socket !== undefined) {
        socket?.disconnect();
      }
    };
  }, []);

  // 채팅 창 HTML를 useRef 훅으로 참조
  const chatWindow = useRef<HTMLDivElement>(null);

  // 새 메시지가 도착하면, 스크롤을 아래로 이동
  // need fix: 과거 내역을 더 보기 위해 스크롤업 할 때 update되는 경우는 scroll 위치 변경 제외해야 하는 개선 필요
  // solution?: dependency를 socket message emit과 내가 작성한 경우에 한정한 state를 만들어서 사용하면 될 것 같음
  useEffect(() => {
    if (chatWindow.current !== null) {
      chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
    }
    return () => {};
  }, [messages]);

  // 날이 바뀌는 경우에 구분 선 만들어주는 함수
  function renderDateSeparator(prevDate: Date, currDate: Date): JSX.Element | null {
    // 이전 메시지가 현재 미시지와 날이 다른 경우,
    if (prevDate.getDate() !== currDate.getDate()) {
      const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', day: '2-digit' };
      const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

      const formattedDate = currDate.toLocaleDateString('ko-KR', dateOptions);
      const formattedTime = currDate.toLocaleTimeString('en-US', timeOptions).toUpperCase(); // AM/PM을 대문자로 표시

      // date-separator div를 반환
      return <div className="date-separator">{`${formattedDate} ${formattedTime}`}</div>;
    }
    return null;
  }

  // 메시지를 렌더링하는 함수
  // condition: 5초 이내 같은 작성자가 메시지를 보내는 경우 한 묶음으로 보기
  // condition: 사용자와 다른 사용자의 메시지를 구분
  function renderMessageContents(data: Message, index: number): JSX.Element | null {
    // 첫번째 메시지거나 채팅 작성자가 바뀌는 경우이면서 채팅 사이 간격이 5초 이상인 경우
    const isFirstOrUserChanged =
      index === 0 ||
      messages[index - 1].user !== data.user ||
      data.time.getTime() - messages[index - 1].time.getTime() > 5000;

    // 마지막 메시지거나 채팅 작성자가 바뀌는 경우이면서 채팅 간격이 5초 이상인 경우
    const isLastOrUserWillChange =
      index === messages.length - 1 ||
      messages[index + 1].user !== data.user ||
      messages[index + 1].time.getTime() - data.time.getTime() > 5000;

    // 작성자가 본인인 경우
    // need fix: change user1 to some props(maybe get from api using auth?)
    const isMe = data.user === 'user1';

    // 메시지 렌더링
    return (
      <>
        {/* 첫번째 메시지 or 사용자 변경 or 내가 아닌 경우 */}
        {isFirstOrUserChanged && !isMe && (
          <div className="message-content others">
            <div className="thumbnail-container">&nbsp;</div>
            <div className="message-username">
              {data.user}, {data.location}
            </div>
          </div>
        )}
        {/* 메시지 표시 div */}
        <div className={`message-content ${isMe ? 'me' : 'others'}`}>
          {isMe ? (
            // 내 메시지 렌더링
            // condition:
            <>
              <div className="message me">
                <div className="bubble me">{data.message}</div>
              </div>
              {isLastOrUserWillChange ? (
                <div className="thumbnail-container">
                  <img
                    src={data.thumbnail}
                    alt={`${data.user} thumbnail`}
                    className="thumbnail right"
                    width={24}
                    height={24}
                  />
                </div>
              ) : (
                <div className="thumbnail-container">&nbsp;</div>
              )}
            </>
          ) : (
            // 다른 사람 메시지
            <>
              {isLastOrUserWillChange ? (
                <div className="thumbnail-container">
                  <img
                    src={data.thumbnail}
                    alt={`${data.user} thumbnail`}
                    className="thumbnail left"
                    width={24}
                    height={24}
                  />
                </div>
              ) : (
                <div className="thumbnail-container">&nbsp;</div>
              )}
              <div className="message others">
                <div className="bubble others">{data.message}</div>
              </div>

              {isLastOrUserWillChange && (
                <div className="message-time others">
                  {data.time.toLocaleDateString('ko-KR', { month: 'long', day: '2-digit' })}
                </div>
              )}
            </>
          )}
        </div>
        {isLastOrUserWillChange && isMe && (
          <div className="message-time me">
            {data.time.toLocaleDateString('ko-KR', { month: 'long', day: '2-digit' })}
          </div>
        )}
      </>
    );
  }

  // 메시지 전송 함수
  const sendMessage = (): void => {
    if (socket !== null || socket !== undefined) {
      socket?.emit('message', { roomId: 56, userId: 9, content: message });
    }

    // message 전송 후 input 창의 message를 초기화
    setMessage('');
  };

  // socket listening...
  // need fix: newMessage need to fix
  // solution?: find keys within crewInfo.member using userId of this user
  // user: member.users_nickname, thumbnail: member.users_profileImage, location: member.users_location
  socket?.on('message', (userId: number, content: string) => {
    const newMessage: Message = {
      user: `user${userId}`,
      message: content,
      time: new Date(),
      thumbnail: '',
      location: '',
    };

    // 서버로부터 받은 메시지를 message state에 추가(온 순서대로 추가하므로 정렬은 필요 없음)
    setMessages(prevData => [...prevData, newMessage]);
  });

  console.log('크루 정보 props', crewInfo);

  // 페이지 렌더링
  return (
    <>
      {/* 채팅 표시 컨테이너 */}
      <div className="chat-container">
        {messages.map((data, index) => (
          <>
            {/* 첫번째 메시지가 아닌 경우만 일자 구분 렌더링 실행 */}
            {index > 0 && renderDateSeparator(messages[index - 1].time, data.time)}
            {/* 메시지 렌더링 */}
            {renderMessageContents(data, index)}
          </>
        ))}
      </div>
      {/* 메시지 입력 컨테이너 */}
      <div className="input-container">
        <form
          className="input-form-container"
          onSubmit={event => {
            event.preventDefault();
            sendMessage();
          }}
        >
          <input
            id="message-input"
            className="input-form"
            placeholder="메시지를 입력하세요"
            value={message}
            onChange={messageChangeHandler}
          />
          <icons.ArrowUp style={{ width: '32px', height: '32px' }} id="message-send-icon" onClick={sendMessage} />
        </form>
      </div>
    </>
  );
}

export default Chat;
