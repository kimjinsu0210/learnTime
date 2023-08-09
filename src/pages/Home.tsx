import { useModal } from "components/overlay/modal/Modal.hooks";
import Posts from "components/posts/Posts";

const Home = () => {
  const { mount } = useModal();

  return (
    <>
      <div>Home</div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button type="button" onClick={() => mount("post", <Posts />)}>
        Posts!
      </button>
    </>
  );
};

export default Home;
