import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Container } from '../../styles/GlobalStyles';
import styled from 'styled-components/native';
import CustomText from '../../components/ui/CustomText';
import { AuthStackParam } from './AuthStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import PrimaryButton from '../../components/buttons/PrimaryButton';

type Navigation = NativeStackNavigationProp<AuthStackParam>;
type RouteParams = { token?: string };

const Base_URL = 'http://10.0.2.2:8080';
const PwResetConfirm_URL = `${Base_URL}/api/auth/pwreset/confirm`;

const ResetPassword = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute();
  const { token } = (route.params as RouteParams) || {};
  const { bottom } = useSafeAreaInsets();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (loading) return;
    if (!password || !confirm) {
      Alert.alert('오류', '비밀번호를 입력해주세요.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!token) {
      Alert.alert('오류', '유효하지 않은 링크입니다.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(PwResetConfirm_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (res.status === 204) {
        Alert.alert('성공', '비밀번호가 성공적으로 변경되었습니다.', [
          { text: '확인', onPress: () => navigation.navigate('Onboarding') },
        ]);
      } else {
        const err = await res.text();
        throw new Error(`(${res.status}) ${err}`);
      }
    } catch (e: any) {
      Alert.alert(
        '실패',
        e?.message ?? '비밀번호 변경 중 오류가 발생했습니다.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ paddingBottom: bottom }}>
      <InputWrapper2>
        <Label2>재설정할 비밀번호를 입력해주세요.</Label2>
        <Label3>새로 입력한 비밀번호로 비밀번호가 변경됩니다.</Label3>
      </InputWrapper2>
      <InputWrapper>
        <Label>비밀번호</Label>
        <Input placeholder="비밀번호를 입력하세요." />
      </InputWrapper>
      <InputWrapper3>
        <Label>비밀번호 확인</Label>
        <Input placeholder="비밀번호를 다시 입력하세요." secureTextEntry />
      </InputWrapper3>

      <PrimaryButton
        title="비밀번호 재설정"
        color={colors.blue}
        onPress={() => navigation.navigate('Main')}
        fontWeight="400"
      />
    </Container>
  );
};

export default ResetPassword;

const Label = styled(CustomText)`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.gray6};
`;

const Label2 = styled(CustomText)`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.gray7};
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
