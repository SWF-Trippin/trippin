import React, { act, useCallback, useRef, useState } from 'react';
import { Container } from '../../styles/GlobalStyles';
import CustomText from '../../components/ui/CustomText';
import TabMenu from '../../components/ui/home/TabMenu';
import styled from 'styled-components/native';
import { colors } from '../../styles/colors';
import BottomSheet, {
  BottomSheetRef,
} from '../../components/ui/home/BottomSheet';
import { useFocusEffect } from '@react-navigation/native';

type TabType = 'popular' | 'route' | 'favorite';

const MainMapScreen = () => {
  const [activeTab, setActiveTab] = useState<TabType>('popular');
  const sheetRef = useRef<BottomSheetRef>(null);

  useFocusEffect(
    useCallback(() => {
      sheetRef.current?.reset();
    }, []),
  );
  return (
    <>
      <MapView>
        <TabMenu activeTab={activeTab} onChange={setActiveTab} />
        <BottomSheet ref={sheetRef} activeTab={activeTab} />
      </MapView>
    </>
  );
};

export default MainMapScreen;

const MapView = styled.View`
  flex: 1;
  background-color: ${colors.background};
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;
