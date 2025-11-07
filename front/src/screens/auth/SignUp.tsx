import React, { useState } from 'react';
import { Container } from '../../styles/GlobalStyles';
import styled from 'styled-components/native';
import CustomText from '../../components/ui/CustomText';
import { AuthStackParam } from './AuthStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { Dropdown } from 'react-native-element-dropdown';
import { Alert, Platform, StyleSheet } from 'react-native';

type Navigation = NativeStackNavigationProp<AuthStackParam>;

const currentYear = new Date().getFullYear();

const yearsData = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => ({
  label: `${currentYear - i}년`,
  value: currentYear - i,
}));

const monthsData = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1}월`,
  value: i + 1,
}));

const getDays = (year: number, month: number) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => ({
    label: `${i + 1}일`,
    value: i + 1,
  }));
};

const Base_URL = 'http://10.0.2.2:8080';
const SignUp_URL = `${Base_URL}/api/auth/signup`;

const SignUp = () => {
  const navigation = useNavigation<Navigation>();
  const { bottom } = useSafeAreaInsets();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const formatDate = (y: number, m: number, d: number) =>
    `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const toServerGender = (g: string) =>
    g === '여자' ? 'F' : g === '남자' ? 'M' : undefined;

  const handleSignUp = async () => {
    if (loading) return;

    if (!email || !nickname || !password) {
      Alert.alert('오류', '이메일, 아이디(닉네임), 비밀번호를 입력해 주세요.');
      return;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('오류', '이메일 형식이 올바르지 않습니다.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    const birthDate =
      year && month && day ? formatDate(year, month, day) : undefined;

    console.log('📅 birthDate:', birthDate);

    const payload: Record<string, any> = {
      email,
      password,
      username: nickname,
    };

    const g = toServerGender(gender);
    if (g) payload.gender = g;
    if (birthDate) payload.birthDate = birthDate;

    console.log('📤 SignUp payload:', JSON.stringify(payload));

    try {
      setLoading(true);

      const res = await fetch(SignUp_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let detail = '';
        try {
          const errText = await res.text();
          detail = errText;
        } catch (_) {}
        throw new Error(`${res.status} ${res.statusText} ${detail}`);
      }

      const data = await res.json();
      Alert.alert('회원가입 완료', data?.message ?? '가입이 완료되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            navigation.navigate('Onboarding');
          },
        },
      ]);
    } catch (e: any) {
      Alert.alert(
        '회원가입 실패',
        e?.message ?? '네트워크 오류가 발생했습니다.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ paddingBottom: bottom }}>
      <InputWrapper>
        <Label1>아이디</Label1>
        <Input
          placeholder="아이디를 입력하세요. (6~20자)"
          value={nickname}
          onChangeText={setNickname}
        />
      </InputWrapper>
      <InputWrapper>
        <Label>이메일</Label>
        <Input
          placeholder="이메일을 입력하세요."
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </InputWrapper>
      <InputWrapper>
        <Label>비밀번호</Label>
        <Input
          placeholder="비밀번호를 입력하세요."
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </InputWrapper>
      <InputWrapper>
        <Label>비밀번호 확인</Label>
        <Input
          placeholder="비밀번호를 다시 입력하세요."
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </InputWrapper>

      <InputWrapper2>
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
      </InputWrapper2>

      <InputWrapper3>
        <Label>생년월일</Label>
        <Row>
          <Dropdown
            style={styles.dropdown}
            placeholder="년도"
            data={yearsData}
            labelField="label"
            valueField="value"
            value={year}
            onChange={item => setYear(item.value)}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={{ fontSize: 13, color: colors.gray6 }}
          />

          <Dropdown
            style={styles.dropdown}
            placeholder="월"
            data={monthsData}
            labelField="label"
            valueField="value"
            value={month}
            onChange={item => setMonth(item.value)}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={{ fontSize: 13, color: colors.gray6 }}
          />

          <Dropdown
            style={styles.dropdown}
            placeholder="일"
            data={year && month ? getDays(year, month) : []}
            labelField="label"
            valueField="value"
            value={day}
            onChange={item => setDay(item.value)}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={{ fontSize: 13, color: colors.gray6 }}
          />
        </Row>
      </InputWrapper3>

      <PrimaryButton
        title={loading ? '회원가입 중...' : '회원가입'}
        color={colors.blue}
        onPress={loading ? undefined : handleSignUp}
        fontWeight="400"
      />
    </Container>
  );
};

export default SignUp;

const Label = styled(CustomText)`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.gray6};
`;

const Label1 = styled(CustomText)`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.gray6};
  margin-top: 36px;
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
  margin-bottom: 36px;
`;

const InputWrapper3 = styled.View`
  width: 100%;
  margin-bottom: 30px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
`;

const GenderButton = styled.TouchableOpacity<{ selected: boolean }>`
  flex: 1;
  padding: 13px;
  margin: 0 5px;
  border-width: 1px;
  border-radius: 20px;
  border-color: ${props => colors.blue};
  background-color: ${props => (props.selected ? colors.blue : colors.white)};
  align-items: center;
`;

const GenderText = styled.Text<{ selected: boolean }>`
  color: ${props => (props.selected ? colors.gray8 : colors.gray5)};
`;

const styles = StyleSheet.create({
  dropdown: {
    flex: 1,
    height: 50,
    borderColor: colors.gray2,
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  placeholderStyle: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.gray6,
  },
  selectedTextStyle: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.gray6,
  },
});
