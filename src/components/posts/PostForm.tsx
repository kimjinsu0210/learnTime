import { supabase } from "api/supabaseClient";
import { addPost } from "api/supabaseDatabaseFn";
import Button from "components/button/Button";
import { useDialog } from "components/overlay/dialog/Dialog.hooks";
import { useModal } from "components/overlay/modal/Modal.hooks";
import useSessionStore from "components/zustand/store";
import useInput from "hooks/useInput";
import { FormEvent } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";

interface Props {
  categoryId: string | undefined;
}

const PostForm = ({ categoryId }: Props) => {
  const { unmount } = useModal();
  const { Alert } = useDialog();
  const [title, handleChangeTitle] = useInput();
  const [link, handleChangeLink] = useInput();
  const [contents, handleChangeContents] = useInput();
  const session = useSessionStore(state => state.session);
  const queryClient = useQueryClient();
  const param = useParams();
  const paramCategoryName = param.category;

  const { mutate } = useMutation({
    mutationFn: async () => {
      await supabase.from("posts").insert({
        title,
        link,
        contents,
        categoryId,
        userId: session?.user.id,
        userEmail: session?.user.email,
        likes: 0
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getCategory");
    }
  });

  const handleCancel = () => {
    unmount("post");
  };

  type SubmitPost = (e: FormEvent<HTMLFormElement>) => void;
  const handlePost: SubmitPost = async e => {
    e.preventDefault();
    if (title === "" || link === "" || contents === "") {
      await Alert("항목들을 모두 채워주세요.");
      return;
    }
    mutate();
    // mutation.mutate({
    //   title,
    //   link,
    //   contents,
    //   categoryId: categoryId ? categoryId : null,
    //   userId: session?.user.id,
    //   userEmail: null,
    //   likes: 0
    // });

    // await supabase.from("posts").insert({
    //   title,
    //   link,
    //   contents,
    //   categoryId,
    //   userId: session?.user.id,
    //   userEmail: session?.user.email,
    //   likes: 0
    // });

    await Alert("작성완료");
    unmount("post");
  };

  console.log(session);

  return (
    <div className="flex flex-col items-center gap-5 px-4 py-1">
      <div className="flex justify-center">
        <label>강의 노트</label>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handlePost}>
        <input
          value={title}
          placeholder=" 제목"
          onChange={handleChangeTitle}
          className="text-black w-96"
          id="title"
        />
        <input
          value={link}
          placeholder=" 링크"
          onChange={handleChangeLink}
          className="text-black w-96"
          id="link"
        />
        <textarea
          value={contents}
          placeholder=" 내용"
          onChange={handleChangeContents}
          className="h-24 text-black w-96"
          id="contents"
        />
        <div className="flex justify-center">
          <Button type="button" onClick={handleCancel}>
            취소
          </Button>
          <Button type="submit">저장</Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
