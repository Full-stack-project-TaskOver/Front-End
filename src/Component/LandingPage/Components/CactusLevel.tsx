import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  useEffect,
} from "react";
import App from "../../Tasks/TaskIndex";

interface level {
  userPoints: number;
  size: string;
  color: string;
  levelHandler: number;
}

function CactusLevel(props: any) {
  let initialPoints = props.userPoints;
  let size = props.size;
  let color = props.color;
  let userLevel: number;
  let userPoints;
  let pointsLeft;
  let currentUserPoints;
  let levelPercentage;
  userLevel = Math.trunc(initialPoints / 500);
  userPoints = userLevel * 500;
  currentUserPoints = initialPoints - userPoints;
  pointsLeft = 500 - currentUserPoints;
  levelPercentage = (currentUserPoints / 500) * 100;

  console.log("Level: ", userLevel);
  console.log("User Points: ", userPoints);
  console.log("Current User Points: ", currentUserPoints);
  console.log("Points Left: ", pointsLeft);
  console.log("%: ", levelPercentage);

  const defaultLevelColor = "linear-gradient(to right, #f12711, #f5af19)";
  color = color.trim() == "" ? defaultLevelColor : color;

  const defaultLevelSize = "2rem";
  size = size.trim() == "" ? defaultLevelSize : size;

  // Sending the level to the parent
  useEffect(() => {
    props.sendLevel(userLevel);
  });

  return (
    <>
      <Flex
        className="level-container"
        flexDirection={"column"}
        paddingY="2rem">
        <Flex
          className="level-text-containter"
          justifyContent={"space-between"}>
          <Text px={"0.8rem"}>{currentUserPoints}XP</Text>
          <Text px={"0.8rem"}>Level {userLevel}</Text>
        </Flex>
        <Flex
          height={size}
          border="2px solid #eee"
          borderRadius={"1rem"}
          position={"relative"}>
          <Text
            position="absolute"
            top="50%"
            left="50%"
            transform={"translate(-50%, -50%)"}>
            Bar Should be here
          </Text>
          {/* LEVEL BORDER */}
          <motion.div
            className="level-border"
            style={{
              margin: -2,
              position: "relative",
              display: "flex",
              width: "100%",
              borderRadius: "1rem",
              padding: "0.3rem",
            }}
            initial={{ width: "5%" }}
            animate={{
              opacity: 1,
              width: `${levelPercentage}%`,
            }}
            transition={{
              duration: 1,
              // type: "Spring",
              times: [0, 0.2, 0.5, 0.8, 0.1],
            }}>
            {/* Level Content */}
            <motion.div
              style={{
                alignItems: "center",
                width: "100%",
                height: "100%",
                borderRadius: "1rem",
                background: color,
              }}
              initial={{ width: "2%" }}
              animate={{
                opacity: 1,
                width: `100%`,
              }}
              transition={{
                duration: 3,
                times: [0, 0.2, 0.5, 0.8, 0.1],
              }}></motion.div>
          </motion.div>
        </Flex>
        <Flex className="level-text-containter" justifyContent={"end"}>
          <Text px={"0.8rem"} color={"gray.500"}>
            {pointsLeft} XP Left
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default CactusLevel;
