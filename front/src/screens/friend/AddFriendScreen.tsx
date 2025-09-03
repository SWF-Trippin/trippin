import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Container } from '../../styles/GlobalStyles';
import CustomText from '../../components/ui/CustomText';
import { colors } from '../../styles/colors';
import SearchBar from './SearchBar.tsx';

import {
  AcceptButton,
  RejectButton,
  ButtonLabel,
  ItemContainer,
  UserName,
} from '../../styles/friendlist.ts';

const ProfileImage = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: gray;
  margin-right: 12px;
  margin-left: 22px;
`;

type FriendRequest = {
  id: string;
  name: string;
  profileImage?: string;
};

const FriendRequestItem = ({
  request,
  onAccept,
  onReject,
}: {
  request: FriendRequest;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}) => (
  <ItemContainer>
    <ProfileImage />
    <UserName>{request.name}</UserName>
    <RejectButton onPress={() => onReject(request.id)}>
      <ButtonLabel reject>거절</ButtonLabel>
    </RejectButton>
    <AcceptButton onPress={() => onAccept(request.id)}>
      <ButtonLabel>수락</ButtonLabel>
    </AcceptButton>
  </ItemContainer>
);
//친구 요청 버튼 추가 필요

const FriendHomeScreen = () => {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [search, setSearch] = useState('');

  // 실제 토큰은 로그인 후 저장된 값 불러오기
  const token = 'your_access_token_here';
  const fromEmail = 'yooonaji@khu.ac.kr'; // 로그인 유저 이메일 (예시)

  // 친구 요청 목록 불러오기
  useEffect(() => {
    if (!search) return;

    const fetchRequests = async () => {
      try {
        const res = await fetch(
          `/api/friends/requests/incoming?email=${encodeURIComponent(search)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) throw new Error(`요청 실패: ${res.status}`);
        const data = await res.json();
        setFriendRequests(data); // API 응답이 배열이라고 가정
      } catch (error) {
        console.error('친구 요청 불러오기 에러:', error);
        setFriendRequests([]);
      }
    };

    fetchRequests();
  }, [search]);

  const handleAccept = async (id: string) => {
    try {
      const res = await fetch(`/api/friends/requests/${id}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`수락 실패: ${res.status}`);
      setFriendRequests(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error('친구 요청 수락 에러:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const res = await fetch(
        `/api/friends/requests/${id}/reject?email=${encodeURIComponent(
          search,
        )}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error(`거절 실패: ${res.status}`);
      setFriendRequests(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error('친구 요청 거절 에러:', error);
    }
  };

  //친구 요청 보내기
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const sendFriendRequest = async () => {
    if (!search) {
      setStatusMessage('이메일을 입력하세요.');
      return;
    }
    try {
      const res = await fetch(`/api/friends/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fromEmail,
          toEmail: search,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || `친구 요청 실패: ${res.status}`);
      }

      setStatusMessage(result.message || '친구 요청 성공');
    } catch (error: any) {
      setStatusMessage(error.message || '친구 요청 에러');
    }
  };

  const Block = styled.View`
    flex: 1;
    width: 100%;
    background-color: ${colors.white};
    border-radius: 30px;
    padding: 8px 0 30px 0;
    margin: 18px 0 0 0;
    elevation: 4;
  `;

  return (
    <Container>
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="이메일로 친구 추가"
        onClear={() => setSearch('')}
        style={{ marginTop: 16, marginHorizontal: 10 }}
      />
      <Block>
        {friendRequests.map(request => (
          <FriendRequestItem
            key={request.id}
            request={request}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        ))}
      </Block>
    </Container>
  );
};

export default FriendHomeScreen;
