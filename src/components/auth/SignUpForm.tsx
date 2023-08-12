import { supabase } from "api/supabaseClient";
import Button from "components/button/Button";
import { uuid } from "@supabase/gotrue-js/dist/module/lib/helpers";
import { useDialog } from "components/overlay/dialog/Dialog.hooks";
import { useState } from "react";

const SignUpForm = ({ unmount }: { unmount: (name: string) => void }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const { Alert } = useDialog();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setProfileFile(selectedFile);
    }
  };

  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return Alert("이메일을 입력하세요!");
    if (!password) return Alert("비밀번호를 입력하세요!");
    if (!nickname) return Alert("닉네임을 입력하세요!");

    let profileUrl = null;
    if (profileFile) {
      //이미지 storage 저장 로직
      const { error: storageError, data: storageData } = await supabase.storage
        .from("profileImgs")
        .upload(`profile_Images/${email}/${uuid()}`, profileFile, {
          cacheControl: "3600",
          upsert: false
        });
      profileUrl = storageData?.path;
      if (storageError) return Alert("storage에러발생");
    }
    //auth 생성
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
          profileImgUrl: profileUrl
        }
      }
    });
    let uid = authData.user?.id;

    //database 생성
    const { error: dbError } = await supabase
      .from("users")
      .insert({ id: uid, email, nickname, profileImgUrl: profileUrl });

    if (authError) {
      if (authError?.message === "Unable to validate email address: invalid format")
        return Alert("이메일 형태가 올바르지 않습니다.");
      else if (authError?.message === "User already registered")
        return Alert("이미 일치하는 회원이 존재합니다.");
    }
    if (dbError) return Alert("db에러발생");
    unmount("signUp");
    return Alert("회원가입이 정상적으로 처리 되었습니다!");
  };
  return (
    <form onSubmit={signUpHandler} className="p-[5px]">
      <div className="flex justify-center mb-5">회원가입</div>

      <div className="flex flex-col gap-2 m-2">
        {/* <label>이메일</label> */}
        <input
          className="auth-input"
          placeholder=" email"
          type="text"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          autoFocus
        />
        {/* <label>비밀번호</label> */}
        <input
          className="auth-input"
          placeholder=" password"
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        {/* <label>닉네임</label> */}
        <input
          className="auth-input"
          placeholder=" nickname"
          type="text"
          value={nickname}
          onChange={e => {
            setNickname(e.target.value);
          }}
        />
        <label>프로필 이미지</label>
        <input type="file" onChange={handleFileChange} />
        {profileFile && (
          <div className="flex justify-center">
            <div>
              <p className="text-center">이미지 미리보기</p>
              <img src={URL.createObjectURL(profileFile)} alt="Profile" className="w-[300px]" />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <Button>가입하기</Button>
        <Button onClick={() => unmount("signUp")}>취소</Button>
      </div>
    </form>
  );
};

export default SignUpForm;
