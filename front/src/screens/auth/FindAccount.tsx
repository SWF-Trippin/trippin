import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Container } from '../../styles/GlobalStyles';
import styled from 'styled-components/native';
import CustomText from '../../components/ui/CustomText';
import { AuthStackParam } from './AuthStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import PrimaryButton from '../../components/buttons/PrimaryButton';

type Navigation = NativeStackNavigationProp<AuthStackParam>;

const Base_URL = 'https://trippin-backend-138144251793.us-central1.run.app';
const PwResetRequest_URL = `${Base_URL}/api/auth/pwreset/request`;

const FindAccount = () => {
  const navigation = useNavigation<Navigation>();
  const { bottom } = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFindPassword = async () => {
    if (loading) return;
    if (!email) {
      Alert.alert('오류', '이메일을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(PwResetRequest_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Reset-Base-Url':
            'https://trippin-backend-138144251793.us-central1.run.app',
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`요청 실패 (${res.status}) : ${errText}`);
      }

      Alert.alert(
        '이메일 전송 완료',
        '입력하신 이메일로 비밀번호 재설정 링크가 전송되었습니다.',
        [{ text: '확인', onPress: () => {} }],
      );
    } catch (e: any) {
      Alert.alert('실패', e?.message ?? '서버 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ paddingBottom: bottom }}>
      <InputWrapper2>
        <Label2>가입한 이메일과 아이디를 입력하세요.</Label2>
        <Label3>입력한 이메일로 비밀번호 재설정 링크를 보내드립니다.</Label3>
      </InputWrapper2>
      <InputWrapper>
        <Label>이메일</Label>
        <Input
          placeholder="이메일을 입력하세요."
          value={email}
          onChangeText={setEmail}
        />
      </InputWrapper>
      <InputWrapper3>
        <Label>아이디</Label>
        <Input
          placeholder="아이디를 입력하세요."
          value={username}
          onChangeText={setUsername}
        />
      </InputWrapper3>

      <PrimaryButton
        title={loading ? '전송 중...' : '비밀번호 찾기'}
        color={colors.blue}
        onPress={handleFindPassword}
        fontWeight="400"
      />
    </Container>
  );
};

export default FindAccount;

const Label = styled(CustomText)`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.gray6};
`;

const Label2 = styled(CustomText)`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.gray7};
  margin-top: 36px;
`;

const Label3 = styled(CustomText)`
  font-size: 13px;
  font-weight: 400;
  color: ${colors.gray5};
`;

const Input = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray2};
  margin: 11px 4.87px 20px 0;
  font-size: 10px;
  color: ${colors.gray5};
  font-weight: 400;
`;

const InputWrapper = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

const InputWrapper2 = styled.View`
  width: 100%;
  margin-bottom: 40px;
`;

const InputWrapper3 = styled.View`
  width: 100%;
  margin-bottom: 357px;
`;
