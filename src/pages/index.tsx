import React from 'react';
import NavBar from "../components/NavBar"
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    pause: isServer()
  });
  return (
    <>
      <NavBar />

      {!data ? "Loading ..." : data.posts.map((p) => <div key={p.id}> {p.title}</div>)}
    </>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
