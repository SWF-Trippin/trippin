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
import { StyleSheet } from 'react-native';

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

const SignUp = () => {
  const navigation = useNavigation<Navigation>();
  const { bottom } = useSafeAreaInsets();
  const [gender, setGender] = useState('');

  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);

  return (
    <Container style={{ paddingBottom: bottom }}>
      <InputWrapper>
        <Label>아이디</Label>
        <Input placeholder="아이디를 입력하세요. (6~20자)" />
      </InputWrapper>
      <InputWrapper>
        <Label>비밀번호</Label>
        <Input placeholder="비밀번호를 입력하세요." secureTextEntry />
      </InputWrapper>
      <InputWrapper2>
        <Label>비밀번호 확인</Label>
        <Input placeholder="비밀번호를 다시 입력하세요." secureTextEntry />
      </InputWrapper2>

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
        title="회원가입"
        color={colors.blue}
        onPress={() => navigation.navigate('Main')}
        fontWeight="400"
      />
    </Container>
  );
};

export default SignUp;

const Label = styled(CustomText)`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 11px;
  color: ${colors.gray6};
`;

const Input = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray2};
  margin: 11px 4.87px 10px 0;
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
  margin-bottom: 132px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
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
