import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { fetchModifyFeedProfile } from "../../../apis/board";
import SubmitButton from "../../../components/atoms/ui/Button/SubmitButton";
import { useModifyBoard } from "../../../hooks/board/useModifyBoard";
import { queryKeys } from "../../../react-query/constants";
import { IFeedModifyProfileType } from "../../../types/board";

const UploadPhoto = dynamic(
  () => import("../../../components/organisms/feed/UploadPhoto"),
  { ssr: false }
);

const FeedDescription = dynamic(
  () => import("../../../components/organisms/feed/FeedDescription"),
  { ssr: false }
);

const MakingNoteTag = dynamic(
  () => import("../../../components/organisms/feed/MakingNoteTag"),
  { ssr: false }
);

const PlaceTag = dynamic(
  () => import("../../../components/organisms/feed/PlaceTag"),
  { ssr: false }
);

const FeedModifyPage: NextPage<{ boardId: string }> = ({ boardId }) => {
  const { isLoading, mutate: modifyBoardAction } = useModifyBoard(+boardId);

  const { data: modifyProfile } = useQuery<IFeedModifyProfileType>(
    [queryKeys.modifyFeedProfile, +boardId],
    () => fetchModifyFeedProfile(+boardId),
    { cacheTime: 0, staleTime: 0 }
  );

  const [uploadImages, setUploadImages] = useState<string[]>([]);
  const [apiImages, setApiImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState<string>("");
  const [selectedTravelNoteId, setSelectedTravelNoteId] = useState<number>(0);
  const [addedPlaceList, setAddedPlaceList] = useState<number[]>([]);

  useEffect(() => {
    if (modifyProfile) {
      setUploadImages(modifyProfile.pictures);
      setApiImages(modifyProfile.pictures);
      setText(modifyProfile.text);
      setSelectedTravelNoteId(modifyProfile.travelNoteTag);
      setAddedPlaceList(modifyProfile.placeTag);
    }
  }, [modifyProfile]);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append(
      "boardId",
      new Blob([boardId], { type: "application/json" })
    );
    files.map((file) => formData.append("pictures", file));
    formData.append(
      "pictureUrl",
      new Blob([JSON.stringify(apiImages)], { type: "application/json" })
    );
    formData.append("text", new Blob([text], { type: "application/json" }));
    formData.append(
      "travelNoteTag",
      new Blob(
        [
          JSON.stringify(
            selectedTravelNoteId === 0 ? null : selectedTravelNoteId
          ),
        ],
        {
          type: "application/json",
        }
      )
    );
    formData.append(
      "placeTag",
      new Blob(
        [
          JSON.stringify(
            addedPlaceList.length > 4
              ? addedPlaceList.slice(0, 4)
              : addedPlaceList
          ),
        ],
        { type: "application/json" }
      )
    );

    modifyBoardAction(formData);
  };

  return (
    <Container>
      <TitleWrapper>
        <Title>피드 업로드</Title>
      </TitleWrapper>
      <form onSubmit={handleSubmitForm}>
        <UploadPhoto
          setFiles={setFiles}
          uploadImages={uploadImages}
          setUploadImages={setUploadImages}
          setApiImages={setApiImages}
        />
        <FeedDescription text={text} setText={setText} />
        <MakingNoteTag
          selectedTravelNoteId={selectedTravelNoteId}
          setSelectedTravelNoteId={setSelectedTravelNoteId}
        />
        <PlaceTag
          addedPlaceList={addedPlaceList}
          setAddedPlaceList={setAddedPlaceList}
        />
        {isLoading ? (
          <LoaderWrapper>
            <ClipLoader color={"#FA8125"} />
          </LoaderWrapper>
        ) : (
          <ButtonWrapper>
            <SubmitButton
              disabled={!text || uploadImages.length === 0}
              rWidth={"100%"}
            >
              수정하기
            </SubmitButton>
          </ButtonWrapper>
        )}
      </form>
    </Container>
  );
};

export default FeedModifyPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { boardId } = context.query;

  const cookies = context.req.cookies;

  if (!cookies.nickname) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
      props: {},
    };
  }

  return {
    props: {
      boardId,
    },
  };
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 219px;
  position: relative;
`;

const TitleWrapper = styled.div`
  height: 80px;
  border-bottom: 1px solid ${({ theme }) => theme.color.grey20};
  padding: 25px 140px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      padding: "25px 16px",
    })}
`;

const Title = styled.p`
  font-size: ${({ theme }) =>
    theme.mixin.fontSize(24, theme.color.grey90, 700)};
  font-family: "PretendardBold";
  width: fit-content;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin: 41px 140px 0;
  justify-content: flex-end;

  ${({ theme }) =>
    theme.media.tabletUnder({
      margin: "41px 16px 0",
    })}
`;

const LoaderWrapper = styled.span`
  display: flex;
  margin: 41px 140px 0;
  justify-content: center;
`;
