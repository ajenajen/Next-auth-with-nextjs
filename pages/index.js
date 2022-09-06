import React from 'react'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import { Flex, Box, Heading, Button } from 'rebass'

export default function Home() {
  const { data: session } = useSession()
  const { push, asPath } = useRouter()
  // const { session, accessToken } = data

  const handleSignIn = () => {
    push(`/auth/login?callbackUrl=${asPath}`)
  }

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
            <Button
              backgroundColor='#dddddd'
              mt={1}
              width={'140px'}
              style={{ cursor: 'pointer' }}
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            Please signed in
            <br />
            <Button
              backgroundColor='#152238'
              mt={1}
              width={'140px'}
              style={{ cursor: 'pointer' }}
              onClick={handleSignIn}
            >
              Sign in
            </Button>
          </div>
        )}
      </Box>
    </Flex>
  )
}
