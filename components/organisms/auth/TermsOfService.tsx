import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Spacer } from "../../atoms/ui/Spacer/Spacer";
import { termContent } from "../../../termContent";
import Terms from "../../molecules/auth/Terms";

const TermsOfService: React.FC<{
  requiredTermsChecked: boolean;
  setSubmitButtonDisabled: Dispatch<SetStateAction<boolean>>;
  setRequiredTermsChecked: Dispatch<SetStateAction<boolean>>;
  setOptionalTermsChecked: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
  const { setRequiredTermsChecked, setOptionalTermsChecked } = props;

  const [checkList, setCheckList] = useState<string[]>([]);

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckList(["required1", "required2", "optional1"]);
    } else {
      setCheckList([]);
    }
  };

  const handleCheckEach = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.target.checked) {
      setCheckList([...checkList, id]);
    } else {
      setCheckList(checkList.filter((elem) => elem !== id));
    }
  };

  const handleAgreeTerm = (id: string) => {
    if (!checkList.find((element) => element === id)) {
      setCheckList([...checkList, id]);
    }
  };

  useEffect(() => {
    if (checkList.includes("required1") && checkList.includes("required2")) {
      setRequiredTermsChecked(true);
    } else {
      setRequiredTermsChecked(false);
    }

    if (checkList.includes("optional1")) {
      setOptionalTermsChecked(true);
    } else {
      setOptionalTermsChecked(false);
    }
  }, [checkList, setRequiredTermsChecked, setOptionalTermsChecked]);

  return (
    <>
      <Terms
        id={"primary"}
        tabIndex={11}
        isPrimary={true}
        onChange={handleCheckAll}
        checked={checkList.length === 3}
        label={"전체 약관 동의"}
      />
      <Spacer size={24} />
      <Terms
        tabIndex={12}
        id={"required1"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleCheckEach(e, "required1")
        }
        checked={checkList.includes("required1")}
        label={"(필수) 여러다임 이용약관 동의"}
        title={"여러다임 이용약관 동의"}
        content={termContent[0]}
        handleAgreeTerm={handleAgreeTerm}
      />
      <Spacer size={8} />
      <Terms
        tabIndex={13}
        id={"required2"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleCheckEach(e, "required2")
        }
        checked={checkList.includes("required2")}
        label={"(필수) 개인정보 수집 및 이용 동의"}
        title={"개인정보 수집 및 이용 동의"}
        content={termContent[1]}
        handleAgreeTerm={handleAgreeTerm}
      />

      <Spacer size={8} />
      <Terms
        optional
        id={"optional1"}
        tabIndex={16}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleCheckEach(e, "optional1")
        }
        checked={checkList.includes("optional1")}
        label={"(선택) 프로모션 정보 수신 동의"}
      />
    </>
  );
};

export default TermsOfService;
