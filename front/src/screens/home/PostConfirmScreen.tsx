import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { HomeStackParam } from './HomeStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, ScrollView } from 'react-native';
import CustomText from '../../components/ui/CustomText';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import api from '../../../axiosConfig';
import Toast from 'react-native-toast-message';

type Photo = {
  imageUrl: string;
  content: string;
  address: string;
  takenAt: string | null;
};

type PostData = {
  title: string;
  photos: Photo[];
};

type PostConfirmRoute = RouteProp<HomeStackParam, 'PostConfirmScreen'>;

const PostConfirmScreen = () => {
  const { params } = useRoute<PostConfirmRoute>();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParam>>();
  const { postData } = params as { postData: PostData };

  const handleSubmit = async () => {
    try {
      const res = await api.post('/api/posts', postData);
      Toast.show({ type: 'success', text1: '게시글이 등록되었습니다!' });
      navigation.popToTop();
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: '등록 실패',
        text2: '다시 시도해주세요.',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <CustomText weight="600" style={{ fontSize: 18, marginBottom: 20 }}>
        {postData.title}
      </CustomText>

      {postData.photos.map((p, idx) => (
        <View key={idx} style={{ marginBottom: 16 }}>
          <CustomText>{`📍 ${p.address || '주소 없음'}`}</CustomText>
          <CustomText>{`📅 ${p.takenAt || '날짜 없음'}`}</CustomText>
          <CustomText>{`📝 ${p.content || '내용 없음'}`}</CustomText>
        </View>
      ))}

      <PrimaryButton title="게시글 등록" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default PostConfirmScreen;
