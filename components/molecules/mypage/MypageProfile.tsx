import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchProfile } from "../../../apis/member";
import { iconUrl } from "../../../axiosInstance/constants";
import { useModifyProfileBio } from "../../../hooks/mypage/useModifyProfileBio";
import { queryKeys } from "../../../react-query/constants";
import { IProfileType } from "../../../types/member";
import ImageMenuModal from "../../atoms/mypage/ImageMenuModal";

const MypageProfile: React.FC = () => {
  const { data: profileData } = useQuery<IProfileType>(
    queryKeys.profile,
    fetchProfile,
    { cacheTime: 0, staleTime: 0 }
  );

  const [bioInput, setBioInput] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const bioInputRef = useRef<HTMLInputElement>(null);

  const modifyProfileBioAction = useModifyProfileBio();

  const imageMenuModalRef = useRef<HTMLDivElement>(null);

  const handleInputKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && bioInputRef.current) {
      bioInputRef.current.blur();
    }
  }, []);

  const handleImageMenuModalOpen = () => {
    setModalOpen((prev) => !prev);
    if (imageMenuModalRef.current) {
      imageMenuModalRef.current.focus();
    }
  };

  useEffect(() => {
    if (profileData) {
      setBioInput(profileData.introduction);
    }
  }, [profileData]);

  return (
    <Container>
      {profileData && (
        <ImageWrapper>
          <ProfileImage
            src={`${profileData.profileImage}?${performance.now()}}`}
            alt={"마이페이지 사용자 프로필 이미지"}
          />
          <ImageContainer onClick={handleImageMenuModalOpen}>
            <Image
              src={iconUrl("edit")}
              width={20}
              height={20}
              alt={"마이 페이지 이미지 편집 아이콘"}
            />
          </ImageContainer>
          <ImageMenuModal
            ref={imageMenuModalRef}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            defaultProfileImage={profileData.defaultProfileImage}
          />
        </ImageWrapper>
      )}
      <TextWrapper>
        <Nickname>{profileData?.nickname}</Nickname>
        <Input
          tabIndex={1}
          onKeyPress={handleInputKeyPress}
          onBlur={() => modifyProfileBioAction(bioInput)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBioInput(e.target.value)
          }
          ref={bioInputRef}
          spellCheck={false}
          defaultValue={profileData?.introduction}
        />
      </TextWrapper>
    </Container>
  );
};

export default MypageProfile;

const Container = styled.div`
  width: 100%;
  height: 125px;
  background-color: ${({ theme }) => theme.color.main50};
  ${({ theme }) => theme.mixin.flexCenter()};
`;

const ImageWrapper = styled.div`
  position: relative;
  margin-right: 16px;
`;

const ImageContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  ${({ theme }) => theme.mixin.flexCenter()};
  cursor: pointer;
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.border2};
  border-radius: 100%;
`;

const Nickname = styled.p`
  font-size: ${({ theme }) => theme.mixin.fontSize(18, theme.color.white, 700)};
  margin-bottom: 16px;
`;

const TextWrapper = styled.span`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border-radius: 8px;
  width: 383px;
  height: 32px;
  padding: 4px 16px;
  background-color: ${({ theme }) => theme.color.main40};
  font-size: ${({ theme }) => theme.mixin.fontSize(14, theme.color.white, 400)};

  ${({ theme }) =>
    theme.media.mobile({
      width: "239px",
    })}
`;

const ProfileImage = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 100%;
  border: 2px solid ${({ theme }) => theme.color.white};
  object-fit: cover;
  box-shadow: 0px 3px 5px rgba(38, 40, 43, 0.04);
`;
