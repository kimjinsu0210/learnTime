const Posts = () => {
  // const { data, isLoading } = useQuery("posts", fetchData);
  // console.log(data);
  // if (isLoading) return <div>Loading...</div>;
  return (
    // grid auto 1fr 안됨...
    <div className="grid grid-cols-2 gap-4">
      <label htmlFor="title">제목:</label>
      <input className="border-solid border-2 border-black" id="title" />

      <label htmlFor="link">링크:</label>
      <input className="border-solid border-2 border-black" id="link" />

      <label htmlFor="contents">내용:</label>
      <textarea className="border-solid border-2 border-black" id="contents" />
    </div>
  );
};

export default Posts;
