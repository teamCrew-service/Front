import React from 'react';
import './JoinStyle.css';

function Join(): JSX.Element {
  return (
    <div className="">
      <div>
        <button type="button">이전</button>
      </div>
      <div>
        <h2>관심있는 주제</h2>
        <p>관심있는 주제를 3가지 이상 선택해 주세요</p>
      </div>
      <div>
        <ul className="topicSelect">
          <li>
            <button type="button" className="active">
              친목
            </button>
          </li>
          <li>
            <button type="button">음료</button>
          </li>
          <li>
            <button type="button">여행</button>
          </li>
          <li>
            <button type="button">운동</button>
          </li>
          <li>
            <button type="button">책/글</button>
          </li>
          <li>
            <button type="button">커리어</button>
          </li>
          <li>
            <button type="button">공연/축제</button>
          </li>
          <li>
            <button type="button">음악</button>
          </li>
          <li>
            <button type="button">만들기</button>
          </li>
          <li>
            <button type="button">사진</button>
          </li>
          <li>
            <button type="button">반려동물</button>
          </li>
          <li>
            <button type="button">자유주제</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Join;
