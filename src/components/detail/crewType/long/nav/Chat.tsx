import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import icons from '../../../../../assets/icons';
import type { MemberDetail } from '../../../../../assets/interfaces';
import './style.css';

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
  sendMessage: (crewId: number, userId: number, content: string) => void;
  joinRoom: (payload: any) => void;
  leaveRoom: (payload: any) => void;
}

// messages: 이전 메시지와 새로 생성될 메시지 state
// message: 작성 중 또는 socket으로 전송 할 메시지
// socket: socket 연결 객체
function Chat({ crewInfo }: { crewInfo: MemberDetail }): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);

  // "message" 채팅 입력 state, handler
  const [message, setMessage] = useState('');
  const messageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  // socket state 정의
  const [socket, setSocket] = useState<Socket | null>(null);

  // 페이지 로딩 시 실행 hook
  useEffect(() => {
    // messages를 시간에 따라 재정렬
    setMessages([...messages].sort((a, b) => a.time.getTime() - b.time.getTime()));
    // Socket 연결 객체 생성
    const socketIO: Socket<ServerToClient, ClientToServer> = io(process.env.REACT_APP_SERVER_URL as string, {
      path: '/chat',
    });
    // Socket 객체를 State로 저장
    setSocket(socketIO);

    socketIO.emit('joinRoom', { crewId: crewInfo.crew.crew_crewId, userId: crewInfo.myUserId });

    // 페이지 언마운트 시 소켓 연결 해제
    return () => {
      socketIO.emit('leaveRoom', { crewId: crewInfo.crew.crew_crewId, userId: crewInfo.myUserId });
      if (socket !== null || socket !== undefined) {
        socket?.disconnect();
      }
    };
  }, []);

  // joinRoom 이벤트 실행 시 오는 previousMessages 이벤트를 수신
  socket?.on('previousMessages', (dataList: any[]) => {
    // console.log('previous message:', dataList);
    const newMessages = dataList.map(data => {
      const { userId, content, createdAt } = data;

      // user의 정보를 userId로부터 찾기
      // 먼저 captain인지 확인
      if (userId === Number(crewInfo.crew.captainId)) {
        return {
          user: crewInfo.crew.captainNickname,
          message: content,
          time: new Date(createdAt),
          thumbnail: crewInfo.crew.captainProfileImage,
          location: crewInfo.crew.captainLocation,
        };
      }

      // captain이 아니라면,
      const userInfo = crewInfo.member.find(info => Number(info.member_userId) === userId);
      return {
        user: userInfo?.users_nickname ?? 'unknown',
        message: content,
        time: new Date(createdAt),
        thumbnail: userInfo?.users_profileImage ?? 'unknown',
        location: userInfo?.users_location ?? 'unknown',
      };
    });

    // 서버로부터 받은 메시지들을 message state에 추가
    setMessages(prevData => [...newMessages, ...prevData]);
  });

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

  // myUserId에서 내 이름을 찾는 함수
  function getMyNickname(): string | undefined {
    const { myUserId } = crewInfo;
    const { captainId } = crewInfo.crew;
    const members = crewInfo.member;

    if (myUserId === captainId.toString()) {
      return crewInfo.crew.captainNickname;
    }

    const member = members.find(m => m.member_userId.toString() === myUserId);
    return member?.users_nickname;
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
    const isMe = data.user === getMyNickname();

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
    if (socket !== null) {
      socket.emit('sendMessage', { crewId: crewInfo.crew.crew_crewId, userId: crewInfo.myUserId, content: message });
    }
    // message 전송 후 input 창의 message를 초기화
    setMessage('');
  };

  // 메시지 이벤트 socket listening
  useEffect(() => {
    const newMessageHandler = (data: any): void => {
      // console.log('message data: ', data);
      const { userId, content, createdAt } = data;

      // user의 정보를 userId로부터 찾기
      // 먼저 captain인지 확인
      if (userId === Number(crewInfo.crew.captainId)) {
        const newMessage: Message = {
          user: crewInfo.crew.captainNickname,
          message: content,
          time: new Date(createdAt),
          thumbnail: crewInfo.crew.captainProfileImage,
          location: crewInfo.crew.captainLocation,
        };

        // 서버로부터 받은 메시지를 message state에 추가(온 순서대로 추가하므로 정렬은 필요 없음)
        setMessages(prevData => [...prevData, newMessage]);
      } else {
        const userInfo = crewInfo.member.find(info => Number(info.member_userId) === userId);

        const newMessage: Message = {
          user: userInfo?.users_nickname ?? 'unknown',
          message: content,
          time: new Date(createdAt),
          thumbnail: userInfo?.users_profileImage ?? 'unknown',
          location: userInfo?.users_location ?? 'unknown',
        };

        // 서버로부터 받은 메시지를 message state에 추가(온 순서대로 추가하므로 정렬은 필요 없음)
        setMessages(prevData => [...prevData, newMessage]);
      }
    };

    socket?.on('message', newMessageHandler);

    // cleanup the listener when the component unmounts
    return () => {
      socket?.off('message', newMessageHandler);
    };
  }, [socket, crewInfo]);

  console.log('크루 정보 props', crewInfo);

  // console.log('message', messages.length);
  // 채팅 창 HTML를 useRef 훅으로 참조
  const chatWindow = useRef<HTMLDivElement>(null);
  // 새 메시지가 도착하면, 스크롤을 아래로 이동
  // need fix: 과거 내역을 더 보기 위해 스크롤업 할 때 update되는 경우는 scroll 위치 변경 제외해야 하는 개선 필요
  // solution?: dependency를 socket message emit과 내가 작성한 경우에 한정한 state를 만들어서 사용하면 될 것 같음
  useEffect(() => {
    // console.log('chatWindow.current:', chatWindow.current);

    if (chatWindow.current !== null) {
      // console.log('chatWindow.current.scrollTop:', chatWindow.current.scrollTop);
      // console.log('chatWindow.current.scrollheight:', chatWindow.current.scrollHeight);
      chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
    }
    return () => {};
  }, [messages.length]);

  // 페이지 렌더링
  /* eslint-disable jsx-a11y/control-has-associated-label */
  return (
    <>
      {/* 채팅 표시 컨테이너 */}
      <div className="chat-container" ref={chatWindow}>
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
            if (message.trim().length > 0) {
              sendMessage();
              setMessage('');
            }
          }}
        >
          <input
            id="message-input"
            className="input-form"
            placeholder="메시지를 입력하세요"
            value={message}
            onChange={messageChangeHandler}
            required
          />
          <button
            type="submit"
            className="send-button"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <icons.ArrowUp style={{ width: '32px', height: '32px' }} id="message-send-icon" />
          </button>
        </form>
      </div>
    </>
  );
}

export default Chat;
