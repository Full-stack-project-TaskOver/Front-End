import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import App from "../../Tasks/TaskIndex";

interface level {
  userPoints: number;
  size: string;
  color: string;
  levelHandler: number;
}

function CactusLevel(props: any) {
  let userPoints = props.userPoints;
  let size = props.size;
  let color = props.color;
  const levels = [
    { level: 1, goalPoints: 500 },
    { level: 2, goalPoints: 1000 },
    { level: 3, goalPoints: 1500 },
    { level: 4, goalPoints: 2000 },
    { level: 5, goalPoints: 2500 },
    { level: 6, goalPoints: 3000 },
    { level: 7, goalPoints: 3500 },
    { level: 8, goalPoints: 4000 },
    { level: 9, goalPoints: 4500 },
    { level: 10, goalPoints: 5000 },
  ];

  //   takes user points then return object:{ level: number; goalPoints: number; } has the user level and goalPoints
  const getUserStage = (points: number) => {
    for (let index = 0; index < levels.length; index++) {
      const currentStage = levels[index];
      if (currentStage.goalPoints >= points) {
        return currentStage;
      }
    }
  };

  
  const cureentUserStage = getUserStage(userPoints);
  // User goal points

  const userGoal = cureentUserStage?.goalPoints
    ? cureentUserStage?.goalPoints
    : -1;
  // User Current Level
  const userLevel = cureentUserStage?.level ? cureentUserStage?.level : -1;
  const pointsLeft = userGoal == userPoints ? userGoal : userGoal - userPoints;
  let nextGoal = 0;
  // Level bar color set.
  const defaultLevelColor = "linear-gradient(to right, #f12711, #f5af19)";
  color = color.trim() == "" ? defaultLevelColor : color;

  const defaultLevelSize = "2rem";
  size = size.trim() == "" ? defaultLevelSize : size;

  const getUserProgress = () => {
    for (let index = 0; index < levels.length; index++) {

      if (userGoal == pointsLeft) {
        return 0;
      }
      if (userLevel == 1) {
        return userPoints;
      } else if (
        userLevel - 1 == levels[index].level ||
        userPoints == levels[index].goalPoints
      ) {
        return userPoints - levels[index].goalPoints;
      }
    }
  };
  const userProgress = getUserProgress();
  // Level in percentage form
  const getlevelPercantage = () => {
    if (userGoal == pointsLeft) {
      return 0;
    } else if (userProgress) {
      return (userProgress / userGoal) * 100;
    }
  };

  const levelPercantage = getlevelPercantage();

  // Sending the level to the parent
  useEffect(() => {
    props.sendLevel(userLevel);
  });
  console.log("levelPercantage %: ", levelPercantage);
  console.log("userGoal: ", userGoal);
  console.log("userLevel: ", userLevel);
  console.log("userProgress: ", userProgress);

  return (
    <>
      <Flex
        className="level-container"
        flexDirection={"column"}
        paddingY="2rem">
        <Flex
          className="level-text-containter"
          justifyContent={"space-between"}>
          <Text px={"0.8rem"}>{userProgress}XP</Text>
          <Text px={"0.8rem"}>Level {userLevel + 1}</Text>
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
              width: `${levelPercantage}%`,
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
