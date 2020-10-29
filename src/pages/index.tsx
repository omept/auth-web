import React from 'react';
import { NavBar } from "../components/NavBar"
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import Layout from '../components/Layout';

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    pause: isServer()
  });
  return (
    <Layout variant="regular">
      {!data ? "Loading ..." : data.posts.map((p) => <div key={p.id}> {p.title}</div>)}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
