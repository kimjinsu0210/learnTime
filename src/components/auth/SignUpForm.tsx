import { useState } from "react";
import defaultImg from "assets/defaultImg.png";
import { AiFillCloseCircle } from "react-icons/ai";
import { supabase } from "api/supabaseClient";
import { useDialog } from "components/overlay/dialog/Dialog.hooks";

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
      const { data, error } = await supabase.storage
      .from("profileImgs")
      .upload(`profile_Images/${email}/${selectedFile.name}`, selectedFile, {
        cacheControl: "3600",
        upsert: false
      });

      if (error) {
        console.error("File upload error:", error);
      } else {
        console.log("File uploaded successfully:", data);
      }
    }
    const { data, error } = await supabase.storage
      .from("profileImgs")
      .download("profile_Images/kimjinsu0210@naver.com/earth_icon.png");
    console.log("downData", data);
    console.log("downError", error);
  };
console.log("profileFile",profileFile)
  return (
    <form onSubmit={signUpHandler} className="p-[20px]">
      <div className="flex justify-end">
        <AiFillCloseCircle
          className="text-3xl text-red-500 cursor-pointer"
          onClick={() => unmount("signUp")}
        />
      </div>
      <div className="flex flex-col gap-4">
        <label>이메일</label>
        <input
          className="auth-input"
          placeholder="예)learntime@learntime.com"
          type="text"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          autoFocus
        />
        <label>비밀번호</label>
        <input
          className="auth-input"
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <label>닉네임</label>
        <input
          className="auth-input"
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
      <div className="flex justify-end">
        <button className="p-2 mt-8 text-white bg-red-500 rounded-lg">가입하기</button>
      </div>
    </form>
  );
};

export default SignUpForm;
