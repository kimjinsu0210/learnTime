import { supabase } from "api/supabaseClient";
import { useDialog } from "components/overlay/dialog/Dialog.hooks";
import { useModal } from "components/overlay/modal/Modal.hooks";
import useInput from "hooks/useInput";

const PostForm = () => {
  const { unmount } = useModal();
  const { Alert } = useDialog();
  const [title, handleChangeTitle] = useInput();
  const [link, handleChangeLink] = useInput();
  const [contents, handleChangeContents] = useInput();

  const handleCancel = () => {
    unmount("post");
  };

  const handlePost = async () => {
    await supabase.from("POSTS").insert({ title, link, contents });
    await Alert("작성완료");
    unmount("post");
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="grid grid-cols-[auto_1fr] gap-4">
        <label htmlFor="title">제목:</label>
        <input
          value={title}
          onChange={handleChangeTitle}
          className="border-solid border-2 border-black"
          id="title"
        />

        <label htmlFor="link">링크:</label>
        <input
          value={link}
          onChange={handleChangeLink}
          className="border-solid border-2 border-black"
          id="link"
        />

        <label htmlFor="contents">내용:</label>
        <textarea
          value={contents}
          onChange={handleChangeContents}
          className="border-solid border-2 border-black"
          id="contents"
        />
      </div>
      <div className="w-full flex justify-evenly">
        <button onClick={handleCancel} className="p-2 text-white bg-red-500 rounded-lg">
          CANCEL
        </button>
        <button onClick={handlePost} className="p-2 text-white bg-red-500 rounded-lg">
          POST
        </button>
      </div>
    </div>
  );
};

export default PostForm;
