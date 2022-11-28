import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { fetchPhotodigmInfo } from "../../apis/photodigm";
import ErrorBoundary from "../../ErrorBoundary";
import { queryKeys } from "../../react-query/constants";
import { IPhotodigmInfoType } from "../../types/photodigm";
import Custom404 from "../404";

const PhotodigmProfile = dynamic(
  () => import("../../components/organisms/photodigm/PhotodigmProfile"),
  { ssr: false }
);

const PhotodigmFrameSelect = dynamic(
  () => import("../../components/organisms/photodigm/PhotodigmFrameSelect"),
  { ssr: false }
);

const PhotodigmMainPicture = dynamic(
  () => import("../../components/organisms/photodigm/PhotodigmMainPicture"),
  { ssr: false }
);

const PhotodigmPictureSection = dynamic(
  () => import("../../components/organisms/photodigm/PhotodigmPictureSection"),
  { ssr: false }
);

const Photodigm: NextPage<{ photodigmId: string }> = ({ photodigmId }) => {
  const { data: profileData } = useQuery<IPhotodigmInfoType>(
    [queryKeys.photodigmInfo, +photodigmId],
    () => fetchPhotodigmInfo(+photodigmId)
  );

  return (
    <ErrorBoundary fallback={<Custom404 />}>
      <Suspense fallback={<ClipLoader color={"#FA8125"} />}>
        <MobileNoneWrapper>
          <PhotodigmProfile
            title={profileData?.title}
            photodigmId={+photodigmId}
          />
        </MobileNoneWrapper>
        <MobileWrapper>
          <PhotodigmProfile
            title={profileData?.title}
            photodigmId={+photodigmId}
          />
        </MobileWrapper>
        <PhotodigmFrameSelect
          photodigmId={+photodigmId}
          frameId={profileData?.frameId || 0}
        />
        <PictureContainer>
          <PhotodigmPictureSection photodigmId={+photodigmId} />
          {profileData && (
            <PhotodigmMainPicture imageUrl={profileData.imageUrl} />
          )}
        </PictureContainer>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Photodigm;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { photodigmId } = context.query;

  return {
    props: {
      photodigmId,
    },
  };
};

const PictureContainer = styled.div`
  padding: 42px 140px;
  display: flex;
  width: 100%;
  flex-direction: row;
  column-gap: 54px;

  ${({ theme }) =>
    theme.media.tabletUnder({
      flexDirection: "column",
      rowGap: "24px",
      padding: "18px 16px",
      alignItems: "center",
    })}

  ${({ theme }) =>
    theme.media.mobile({
      paddingBottom: "160px",
    })}
`;

const MobileNoneWrapper = styled.div`
  ${({ theme }) =>
    theme.media.mobile({
      display: "none",
    })}
`;

const MobileWrapper = styled.div`
  display: none;

  ${({ theme }) =>
    theme.media.mobile({
      position: "fixed",
      display: "flex",
      width: "100%",
      borderTop: `1px solid ${theme.color.grey20}`,
      bottom: 0,
    })}
`;
