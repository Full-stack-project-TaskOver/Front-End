import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface level {
  level: number;
  goalPoints: number;
}

interface levelStyle {
  userPoints: number;
}

function Level({ userPoints }: levelStyle) {
  //   const { scrollXProgress } = useScroll();
  const levels = [
    { level: 1, goalPoints: 200 },
    { level: 2, goalPoints: 500 },
    { level: 3, goalPoints: 800 },
    { level: 4, goalPoints: 1000 },
    { level: 5, goalPoints: 1400 },
    { level: 6, goalPoints: 2000 },
    { level: 7, goalPoints: 3000 },
    { level: 8, goalPoints: 3300 },
    { level: 9, goalPoints: 4000 },
    { level: 10, goalPoints: 6000 },
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

  //
  const getUserProgress = () => {
    for (let index = 0; index < levels.length; index++) {
      const currentStage = levels[index];
      console.log(currentStage);

      console.log(
        "userlevel: " + userLevel,
        "userlevel - 1: " + (userLevel - 1),
        "stage: " + currentStage.level
      );

      if (userLevel == 0 || userLevel == 1) {
        return userPoints;
      } else if (userLevel - 1 == currentStage.level) {
        console.log(userPoints, currentStage.goalPoints);
        console.log(userPoints - currentStage.goalPoints);
        return userPoints - currentStage.goalPoints;
      }
    }
    return -1;
  };

  const cureentUserStage = getUserStage(userPoints);

  // User goal points
  const userGoal = cureentUserStage?.goalPoints
    ? cureentUserStage?.goalPoints
    : -1;

  // User Current Level
  console.log(cureentUserStage?.level);

  const userLevel = cureentUserStage?.level ? cureentUserStage?.level : -1;
  const userProgress = getUserProgress();

  console.log(userProgress);

  // Level in percentage form
  const levelPercantage = ((userProgress ? userProgress : -1) / userGoal) * 100;

  console.log("<<<< NEW >>>>");
  console.log("User lvl: " + userLevel);
  console.log("User points: " + userPoints);
  console.log("User Progress: " + userProgress);
  console.log("User goal: " + userGoal);

  //   const goal = levels.map((currentLevel)=> levels.level)
  return (
    <>
      <Flex
        className="level-container"
        flexDirection={"column"}
        paddingY="2rem">
        <Flex
          className="level-text-containter"
          justifyContent={"space-between"}>
          <Text>Points {userProgress}</Text>
          <Text>Level {userLevel + 1}</Text>
        </Flex>
        <Flex
          height="1rem"
          border="2px solid #eee"
          borderRadius={"1rem"}
          position={"relative"}>
          {/* <Text
          position="absolute"
          top="50%"
          left="50%"
          transform={"translate(-50%, -50%)"}>
          Bar Should be here
        </Text> */}

          {/* LEVEL BORDER */}
          <motion.div
            className="level-border"
            style={{
              margin: -2,
              position: "relative",
              display: "flex",
              // borderTop: "2px solid linear-gradient(to bottom, #f12711, #f5af19)",
              // borderBottom: "2px solid linear-gradient(to bottom, #f12711, #f5af19)",
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
                background: "linear-gradient(to right, #f12711, #f5af19)",
              }}
              initial={{ width: "2%" }}
              animate={{
                opacity: 1,
                width: `100%`,
              }}
              transition={{
                duration: 1,
                // type: "Spring",
                times: [0, 0.2, 0.5, 0.8, 0.1],
              }}></motion.div>
          </motion.div>
        </Flex>
        <Flex className="level-text-containter" justifyContent={"end"}>
          <Text color={"gray.500"}>{userGoal} XP</Text>
        </Flex>
      </Flex>
    </>
  );
}

export default Level;
