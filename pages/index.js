import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Flex, Box, Heading, Button } from 'rebass';

export default function Home() {
  const { data: session } = useSession();
  // const { session, accessToken } = data

  return (
    <Flex flexWrap={'wrap'} justifyContent={'center'} py={5}>
      <Box width={[1, 1 / 2, 1 / 3]}>
        <Heading as='h1' mb={3} textAlign='center'>
          Welcome to Next-auth with Next.js demo.
        </Heading>
        {session ? (
          <div style={{ textAlign: 'center' }}>
            Signed in as {session.user.email} <br />
            <br />
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            Please signed in <br />
            <br />
            <Button onClick={() => signIn()}>Sign in</Button>
          </div>
        )}
      </Box>
    </Flex>
  );
}
