import React, { useEffect, useState } from 'react';
import '../style.css';

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
      user: 'user1',
      message: 'Hello, how are you?',
      time: new Date(2023, 0, 3, 13, 22, 42),
      thumbnail:
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
      location: 'New York, NY',
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
      user: 'user2',
      message: "I'm good, thank you! How about you?",
      time: new Date(2023, 0, 3, 13, 23, 15),
      thumbnail:
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
      location: 'Los Angeles, CA',
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
      user: 'user2',
      message: 'Great to hear. Do you have any plans for the weekend?',
      time: new Date(2023, 0, 3, 13, 26, 30),
      thumbnail:
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
      location: 'Los Angeles, CA',
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
      return (
        <div className="date-separator">{currDate.toLocaleDateString('ko-KR', { month: 'long', day: '2-digit' })}</div>
      );
    }
    return null;
  }

  return (
    <div className="chat-container">
      {mockData.map((data, index) => (
        <React.Fragment key={data.time.toString()}>
          {index > 0 && renderDateSeparator(mockData[index - 1].time, data.time)}
          <div className={data.user === 'user1' ? 'message right' : 'message left'}>
            <div className="message-content">
              {(index === 0 ||
                mockData[index - 1].user !== data.user ||
                data.time.getTime() - mockData[index - 1].time.getTime() > 5000) &&
              data.user !== 'user1' ? (
                <div className="message-username">
                  {data.user}, {data.location}
                </div>
              ) : null}
              <div className="message-bubble">{data.message}</div>
            </div>
            {index === mockData.length - 1 ||
            mockData[index + 1].user !== data.user ||
            mockData[index + 1].time.getTime() - data.time.getTime() > 5000 ? (
              <>
                <div className="message-time">
                  {data.time.toLocaleDateString('ko-KR', { month: 'long', day: '2-digit' })}
                </div>
                <div className="thumbnail-container">
                  <img
                    src={data.thumbnail}
                    alt={`${data.user} thumbnail`}
                    className={data.user === 'user1' ? 'thumbnail right' : 'thumbnail left'}
                  />
                </div>
              </>
            ) : null}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Chat;
