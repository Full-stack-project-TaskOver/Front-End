import { Box, Flex, Center, SimpleGrid, Text, Heading, useColorModeValue, Img, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';

import trophy from '../../assets/trophy.png'
import medal1 from '../../assets/medal1.png'
import medal2 from '../../assets/medal2.png'
import medal3 from '../../assets/medal3.png'

interface res {
  point: number;
  user: {
    id: string;
    name: string;
  };
}


function Leaderboard() {
  const [leaderBoardArr, setleaderBoardArr] = useState<res[]>([]);
  let { id } = useParams();

  const getUsersAndPoints = async () => {
    const req = await fetch(`http://localhost:3003/usersAndSession/points/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await req.json();
    setleaderBoardArr(data.session);
  };

  useEffect(() => {
    getUsersAndPoints();
  }, []);


  const checkOrder = (i:number)=>{
    if(i == 0){
      return (<Img src={medal1} height='100%' width='100%'/>)
    }else if (i == 1){
      return (<Img src={medal2} height='100%' width='100%' />)
    }else if (i == 2){
      return (<Img src={medal3} height='100%' width='100%' />)
    }
    return i + 1
  }

  return (
    <Box px={{base:0, md:'6rem'}} mb="6rem">
      <Heading as={'h1'} fontSize={'3rem'} my={'6rem'} textAlign={'center'}>
        Leaderboard 
      </Heading>
      


            <SimpleGrid position={'relative'}
             py={'2rem'} px={{base:0, sm:'3rem'}} alignItems="center" 
            borderRadius={'15px'}
            border={'3px dashed '} borderColor={useColorModeValue("#f0f0f0", "#242a38")}
            bgColor={useColorModeValue("gray.50", "gray.900")}
            >
              <Img position={'absolute'} 
              top={'-83px'} left={10}
              w={"80px"} h={'80px'} src={trophy} />
              

              <Flex 
                    justifyContent={'space-around'} alignItems={'center'} 
                    pb={'2rem'}
                    fontSize={'1rem'}
                    fontWeight={'bold'}

                    
                    
              >
                <Text>Name</Text>
                <Text>Points</Text>
                <Text>Rank</Text>

              </Flex>
              
              {leaderBoardArr != undefined &&
                leaderBoardArr.map((e, i) => (
                  <Flex
                    alignItems="center"
                    justifyContent={'space-around'}
                    my={'10px'}
                    fontSize={'1rem'}
                    backgroundColor={useColorModeValue("#fdfdfd", "gray.800")}
                    border='3px solid'
                    borderLeft={{base:'none', sm:`3px solid ${useColorModeValue("#f0f0f0", "#242a38")}`}}
                    borderRight={{base:'none', sm:`3px solid ${useColorModeValue("#f0f0f0", "#242a38")}`}}
                    borderColor={useColorModeValue("#f0f0f0", "#242a38")}
                    py={'30px'}
                    rounded={{base: 0 ,sm:8}}
                    transition={'.4s'}
                    _hover={{transform:"scale(1.02)"}}
                    key={e.user.id}
                  >
                    <Text maxW={12} minW={12}className="center-text ">{e.user.name}</Text>
                    <Text maxW={12} minW={12} className="center-text">{e.point}</Text>
                    <Text maxW={12} minW={12} className="center-text">{checkOrder(i)}</Text>
                  </Flex>
                ))}

            </SimpleGrid>
      </Box>

  );
}

export default Leaderboard;
