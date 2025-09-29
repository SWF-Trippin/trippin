import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';

export default function SignUpScreen() {
  const [gender, setGender] = useState<'남자' | '여자' | null>(null);

  return (
    <Container>
      <Title>회원가입</Title>

      {/* 아이디 */}
      <Label>아이디</Label>
      <Input placeholder="아이디를 입력하세요. (6~20자)" />

      {/* 비밀번호 */}
      <Label>비밀번호</Label>
      <Input placeholder="비밀번호를 입력하세요." secureTextEntry />

      {/* 비밀번호 확인 */}
      <Label>비밀번호 확인</Label>
      <Input placeholder="비밀번호를 다시 입력하세요." secureTextEntry />

      {/* 성별 */}
      <Label>성별</Label>
      <Row>
        <GenderButton
          selected={gender === '남자'}
          onPress={() => setGender('남자')}
        >
          <GenderText selected={gender === '남자'}>남자</GenderText>
        </GenderButton>
        <GenderButton
          selected={gender === '여자'}
          onPress={() => setGender('여자')}
        >
          <GenderText selected={gender === '여자'}>여자</GenderText>
        </GenderButton>
      </Row>

      {/* 생년월일 */}
      <Label>생년월일</Label>
      <Row>
        <DateInput placeholder="년도" />
        <DateInput placeholder="월" />
        <DateInput placeholder="일" />
      </Row>

      {/* 회원가입 버튼 */}
      <SignUpButton>
        <SignUpText>회원가입</SignUpText>
      </SignUpButton>
    </Container>
  );
}

// styled-components
const Container = styled.ScrollView`
  flex: 1;
  padding: 24px;
  background-color: #ffffff;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  align-self: center;
  margin-bottom: 24px;
`;

const Label = styled.Text`
  font-size: 14px;
  margin-bottom: 8px;
  color: #555;
`;

const Input = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  margin-bottom: 24px;
  padding: 8px 0;
`;

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const GenderButton = styled.TouchableOpacity<{ selected: boolean }>`
  flex: 1;
  padding: 12px;
  margin: 0 4px;
  border-width: 1px;
  border-radius: 20px;
  border-color: ${(props) => (props.selected ? '#b0d8f5' : '#ccc')};
  background-color: ${(props) => (props.selected ? '#b0d8f5' : '#fff')};
  align-items: center;
`;

const GenderText = styled.Text<{ selected: boolean }>`
  color: ${(props) => (props.selected ? '#333' : '#666')};
`;

const DateInput = styled.TextInput`
  flex: 1;
  margin: 0 4px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  text-align: center;
  padding: 8px 0;
`;

const SignUpButton = styled.TouchableOpacity`
  background-color: #b0d8f5;
  padding: 16px;
  border-radius: 20px;
  align-items: center;
`;

const SignUpText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;
