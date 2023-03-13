import { Box, Flex, Center, SimpleGrid, Text, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface res {
  point: number;
  user: {
    id: string;
    name: string;
  };
}

function Leaderboard() {
  const [leaderBoardArr, setleaderBoardArr] = useState<res[]>([]);

  const getUsersAndPoints = async () => {
    const req = await fetch('http://localhost:3003/usersAndSession/points', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: '7fe60445-c224-43c1-9954-0daeb702a85b',
      }),
    });
    const data = await req.json();

    setleaderBoardArr(data.session);
  };

  useEffect(() => {
    getUsersAndPoints();
  }, []);

  return (
    <Box>
      <Heading as={'h1'} fontSize={'3rem'} mt={'3rem'} textAlign={'center'}>Leaderboard</Heading>
      <Box  
        bg={'#F4F8FC'}
        mx={'7rem'}
        my={'5rem'}
        py={7}
        border={'none'}
        boxShadow={'0 0.3em 0.5em 0 rgba(31, 38, 135, 0.37)'}
        borderRadius={'15px'}
      >
        <Center>
          <Flex flexDirection={'column'} w={'90%'}>
            <SimpleGrid columns={1} alignItems="center">
              <SimpleGrid columns={3}>
                <Text className="center-text header">Name</Text>
                <Text className="center-text header">Points</Text>
                <Text className="center-text header">Rank</Text>
              </SimpleGrid>
              {leaderBoardArr != undefined &&
                leaderBoardArr.map((e: res, i) => (
                  <SimpleGrid
                  alignItems="center"
                    my={'10px'}
                    fontSize={'1rem'}
                    backgroundColor={'#f1f3f1'}
                    boxShadow={'0 0.3em 0.5em 0 rgba(31, 38, 135, 0.37)'}
                    border={'none 1px'}
                    py={'30px'}
                    borderRadius={'15px'}
                    transition={'.4s'}
                    _hover={{transform:"scale(1.02)"}}
                    key={e.user.id}
                    columns={3}
                  >
                    <Text className="center-text ">{e.user.name}</Text>
                    <Text className="center-text">{e.point}</Text>
                    <Text className="center-text">{i + 1}</Text>
                  </SimpleGrid>
                ))}
            </SimpleGrid>
          </Flex>
        </Center>
      </Box>
    </Box>
  );
}

export default Leaderboard;
