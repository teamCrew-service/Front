import React, { useEffect, useState } from 'react';

interface Message {
  user: string;
  message: string;
  time: Date;
  thumbnail: string;
  location: string;
}

function Chat(): JSX.Element {
  const rawMockData = [
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
  ];

  const [mockData, setMockData] = useState<Message[]>([]);

  useEffect(() => {
    const sortedData = [...rawMockData].sort((a, b) => a.time.getTime() - b.time.getTime());
    setMockData(sortedData);
  }, []);

  function renderDateSeparator(prevDate: Date, currDate: Date): JSX.Element | null {
    if (prevDate.getDate() !== currDate.getDate()) {
      const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', day: '2-digit' };
      const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

      const formattedDate = currDate.toLocaleDateString('ko-KR', dateOptions);
      const formattedTime = currDate.toLocaleTimeString('en-US', timeOptions).toUpperCase(); // AM/PM을 대문자로 표시

      return <div className="date-separator">{`${formattedDate} ${formattedTime}`}</div>;
    }
    return null;
  }

  function renderMessageContents(data: Message, index: number): JSX.Element | null {
    // 첫번째 메시지거나 채팅 작성자가 바뀌는 경우이면서 채팅 사이 간격이 5초 이상인 경우
    const isFirstOrUserChanged =
      index === 0 ||
      mockData[index - 1].user !== data.user ||
      data.time.getTime() - mockData[index - 1].time.getTime() > 5000;

    // 마지막 메시지거나 채팅 작성자가 바뀌는 경우이면서 채팅 간격이 5초 이상인 경우
    const isLastOrUserWillChange =
      index === mockData.length - 1 ||
      mockData[index + 1].user !== data.user ||
      mockData[index + 1].time.getTime() - data.time.getTime() > 5000;

    // 작성자가 본인인 경우
    const isMe = data.user === 'user1';

    return (
      <>
        {isFirstOrUserChanged && !isMe && (
          <div className="message-content others">
            <div className="thumbnail-container">&nbsp;</div>
            <div className="message-username">
              {data.user}, {data.location}
            </div>
          </div>
        )}
        <div className={`message-content ${isMe ? 'me' : 'others'}`}>
          {isMe ? (
            <>
              <div className={`message ${isMe ? 'me' : 'others'}`}>
                <div className={`bubble ${isMe ? 'me' : 'others'}`}>{data.message}</div>
              </div>
              {isLastOrUserWillChange ? (
                <div className="thumbnail-container">
                  <img
                    src={data.thumbnail}
                    alt={`${data.user} thumbnail`}
                    className={`thumbnail ${isMe ? 'right' : 'left'}`}
                    width={24}
                    height={24}
                  />
                </div>
              ) : (
                <div className="thumbnail-container">&nbsp;</div>
              )}
            </>
          ) : (
            <>
              {isLastOrUserWillChange ? (
                <div className="thumbnail-container">
                  <img
                    src={data.thumbnail}
                    alt={`${data.user} thumbnail`}
                    className={`thumbnail ${isMe ? 'right' : 'left'}`}
                    width={24}
                    height={24}
                  />
                </div>
              ) : (
                <div className="thumbnail-container">&nbsp;</div>
              )}
              <div className={`message ${isMe ? 'me' : 'others'}`}>
                <div className={`bubble ${isMe ? 'me' : 'others'}`}>{data.message}</div>
              </div>

              {isLastOrUserWillChange && (
                <div className={`message-time ${isMe ? 'me' : 'others'}`}>
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

  return (
    <div className="chat-container">
      {mockData.map((data, index) => (
        <>
          {index > 0 && renderDateSeparator(mockData[index - 1].time, data.time)}
          {renderMessageContents(data, index)}
        </>
      ))}
    </div>
  );
}

export default Chat;
