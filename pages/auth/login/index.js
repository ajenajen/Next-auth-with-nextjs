import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Flex, Box, Heading, Button } from 'rebass'
import { Label, Input } from '@rebass/forms'

import { providers } from './config'

function LoginPage() {
  const { data: session, status } = useSession()
  const { push, asPath } = useRouter()
  const [email, setEmail] = useState('')

  if (status === 'loading') {
    return (
      <Heading as='h1' mb={3} textAlign='center'>
        Cheking Authentication...
      </Heading>
    )
  }

  if (session) {
    setTimeout(() => {
      push(`/`)
    }, 3000)

    return (
      <Heading as='h1' mb={3} textAlign='center'>
        You are already signed in
      </Heading>
    )
  }

  const handleOAuthSignIn = (provider) => () => signIn(provider)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email) return false

    signIn('email', { email, redirect: false })
  }

  return (
    <Flex flexWrap={'wrap'} justifyContent={'center'} py={5} color='#152238'>
      <Box width={[2 / 3, 1 / 3, 1 / 4, 1 / 5]}>
        <Box as='form' onSubmit={handleSubmit} py={4}>
          <Box width={1} pb={2}>
            <Label mb={1}>Email Address</Label>
            <Input
              id='email'
              name='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </Box>
          <Button
            type='submit'
            backgroundColor='#152238'
            width={'100%'}
            style={{ cursor: 'pointer' }}
          >
            Login
          </Button>
        </Box>
        {providers.map(({ name, Icon, color }) => (
          <Button
            key={name}
            onClick={handleOAuthSignIn(name)}
            display='flex'
            alignItems='center'
            width={'100%'}
            mb={2}
            backgroundColor={color}
            style={{ cursor: 'pointer' }}
          >
            <Icon style={{ marginRight: 10, display: 'block' }} />
            Sign in with {name}
          </Button>
        ))}
      </Box>
    </Flex>
  )
}

export default LoginPage
