import styled from 'styled-components/native';
import Carousel from './Carousel';
import CustomText from './CustomText';
import { useState } from 'react';

type Comment = {
  commentId: number;
  comment: string;
  createdAt: string;
  authorName: string;
  authorProfileImage: string | null;
};

type PhotoDetail = {
  type: 'photo';
  photoId: number;
  content: string;
  imageUrl: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  authorName: string;
  authorProfileImage: string | null;
  comments: Comment[];
};

type PostDetail = {
  type: 'post';
  postId: number;
  title: string;
  period: string;
  authorName: string;
  authorProfileImage: string | null;
  photos: PhotoDetail[];
};

const PostDetailView = ({ data }: { data: PostDetail }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const current = data.photos[activeIndex];

  return (
    <Block>
      <Header>
        <UserInfo>
          <ProfileImage
            source={
              data.authorProfileImage
                ? { uri: data.authorProfileImage }
                : require('../../assets/images/icon/author.png')
            }
          />
          <UserName>{data.authorName}</UserName>
        </UserInfo>
      </Header>

      <Carousel
        images={data.photos.map(p => p.imageUrl)}
        itemSize={250}
        spacing={10}
        onIndexChange={idx => setActiveIndex(idx)}
      />

      <Title>{data.title}</Title>
      <Period>{data.period}</Period>

      <Description>{current.content}</Description>

      <PostComments>
        {current.comments.length === 0 ? (
          <></>
        ) : (
          current.comments.map(cmt => (
            <CommentBlock key={cmt.commentId}>
              <CommentUser>{cmt.authorName}</CommentUser>
              <CommentText>{cmt.comment}</CommentText>
            </CommentBlock>
          ))
        )}
      </PostComments>
    </Block>
  );
};

export default PostDetailView;

const Block = styled.View``;
const Header = styled.View``;
const UserInfo = styled.View``;
const ProfileImage = styled.Image``;
const UserName = styled(CustomText)``;
const Title = styled(CustomText)``;
const Period = styled(CustomText)``;
const Description = styled(CustomText)``;
const PostComments = styled.View``;
const CommentBlock = styled.View``;
const CommentUser = styled(CustomText)``;
const CommentText = styled(CustomText)``;
