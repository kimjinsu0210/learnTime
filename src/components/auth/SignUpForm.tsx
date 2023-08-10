import { useState } from "react";
import defaultImg from "assets/defaultImg.png";
import { supabase } from "api/supabaseClient";
import { useDialog } from "components/overlay/dialog/Dialog.hooks";
import Button from "components/button/Button";

const SignUpForm = ({ unmount }: { unmount: (name: string) => void }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const { Alert } = useDialog();

  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return Alert("이메일을 입력하세요!");
    if (!password) return Alert("비밀번호를 입력하세요!");
    if (!nickname) return Alert("닉네임을 입력하세요!");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
          profileImgUrl: !profileFile ? defaultImg : profileFile
        }
      }
    });
    if (error) {
      Alert("이미 일치하는 회원이 존재합니다.");
    } else {
      unmount("signUp");
      alert("회원가입 완료");
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setProfileFile(selectedFile);
      // const fileData = new FormData();
      // console.log("fileData", fileData);
      // fileData.append("file", selectedFile);
      const { data, error } = await supabase.storage
        .from("profileImgs")
        .upload(`profile_Images/${selectedFile.name}`, selectedFile, {
          cacheControl: "3600",
          upsert: false
        });
      console.log("data", data);
      if (error) {
        console.error("File upload error:", error);
      } else {
        console.log("File uploaded successfully:", data);
      }
    }
  };

  return (
    <form onSubmit={signUpHandler} className="p-[5px]">
      <div className="mb-5 flex justify-center">회원가입</div>

      <div className="flex flex-col m-2 gap-2">
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
        <input className="auth-input" type="file" onChange={handleFileChange} />
        {profileFile && (
          <div className="flex justify-center">
            <img src={URL.createObjectURL(profileFile)} alt="Profile" className="w-[200px]" />
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <Button onClick={() => unmount("signUp")}>취소</Button>
        <Button>가입하기</Button>
      </div>
    </form>
  );
};

export default SignUpForm;
