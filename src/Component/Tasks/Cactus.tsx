import React, {
    useEffect,
    useState,
    useRef
  } from "react";
  import ReactDOM from "react-dom";
  import ReactSlider from "react-slider";
  import {
    motion,
    AnimatePresence
  } from "framer-motion";
  
  const generateStageBasedPathVariants = (i:number) =>
    new Array(8).fill("").reduce(
      (acc, curr, index) => ({
        ...acc,
        [index]:
          index < i
            ? {
                opacity: 0,
                scale: 0,
                rotate: 0,
                transition: {
                  staggerChildren: 0.05,
                  when: "afterChildren"
                }
              }
            : {
                opacity: 1,
                rotate: 0,
                scale: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
      }),
      {}
    );
  
  const generateStageBasedPokerVariants = (i:number) =>
    new Array(8).fill("").reduce(
      (acc, curr, index) => ({
        ...acc,
        [index]:
          index < i
            ? {
                strokeDashoffset: -150
              }
            : {
                strokeDashoffset: 0
              }
      }),
      {}
    );
  
  const nodes = [
    {
      index: 4,
      zIndex: 0,
      style: { originX: 0.2, originY: 0.8 },
      pathVariants: generateStageBasedPathVariants(4),
      pokerVariants: generateStageBasedPokerVariants(4),
      path:
        "M345.57486,279.46068c.2571,4.19224.8121,13.24372,7.25641,20.55993,19.96595,22.66767,85.64808,16.40223,98.56638-19.95515,9.37534-26.386-10.67752-64.01274-38.0962-70.14531C378.95636,202.23833,343.54246,246.31806,345.57486,279.46068Z",
      pokers: [
        {
          x1: "421.71356",
          y1: "317.9927",
          x2: "418.76791",
          y2: "308.69096"
        },
        {
          x1: "433.71356",
          y1: "205.10288",
          x2: "427.08629",
          y2: "215.9315"
        },
        {
          x1: "355.49134",
          y1: "221.10288",
          x2: "365.22981",
          y2: "230.01856"
        },
        {
          x1: "466.158",
          y1: "267.13416",
          x2: "453.73604",
          y2: "267.13416"
        },
        {
          x1: "402.158",
          y1: "231.99176",
          x2: "397.82467",
          y2: "246.49631"
        },
        {
          x1: "427.08629",
          y1: "269.99176",
          x2: "414.49134",
          y2: "267.13416"
        },
        {
          x1: "381.158",
          y1: "272.68677",
          x2: "378.49134",
          y2: "285.3251"
        },
        {
          x1: "269.86883",
          y1: "326.29151",
          x2: "267.78052",
          y2: "335.63131"
        },
        {
          x1: "278.50402",
          y1: "364.55331",
          x2: "290.14304",
          y2: "363.19477"
        }
      ]
    },
    {
      index: 3,
      zIndex: 1,
      pathVariants: generateStageBasedPathVariants(3),
      pokerVariants: generateStageBasedPokerVariants(3),
      path:
        "M290.75367,257.77611c-34.2583,14.25756-70.50315,101.68554-48.93665,126.61132,2.1966,2.53858,7.83771,11.96241,22.49579,13.46875,32.97,3.38868,111.16406-72.3894,99.798-108.44458C355.57032,262.31981,317.97272,246.44823,290.75367,257.77611Z",
      style: { originX: 0.2, originY: 0.8 },
      pokers: [
        {
          x1: "229.33419",
          y1: "329.31503",
          x2: "238.18414",
          y2: "332.60779"
        },
        {
          x1: "258.88087",
          y1: "272.68677",
          x2: "266.28754",
          y2: "279.19261"
        },
        {
          x1: "339.19921",
          y1: "246.49631",
          x2: "335.72385",
          y2: "258.24733"
        },
        {
          x2: "365.22981",
          y2: "301.6376",
          x1: "375.82467",
          y1: "301.6376"
        },
        {
          x2: "327.98298",
          y2: "361.31602",
          x1: "338.60245",
          y1: "366.43206"
        },
        {
          x1: "299.27724",
          y1: "288.48108",
          x2: "301.27724",
          y2: "299.76954"
        },
        {
          x1: "328.70296",
          y1: "315.71893",
          x2: "318.50921",
          y2: "320.26646"
        },
        {
          x1: "269.86883",
          y1: "326.29151",
          x2: "267.78052",
          y2: "335.63131"
        },
        {
          x2: "278.50402",
          y2: "364.55331",
          x1: "290.14304",
          y1: "363.19477"
        },

      ]
    },
    {
      index: 7,
      zIndex: 5,
  
      pathVariants: generateStageBasedPathVariants(7),
      pokerVariants: generateStageBasedPokerVariants(7),
      path:
        "M296.64555,276.02865c-23.43,2.42023-60.63294-35.55193-54.75319-67.20649,5.15978-27.77862,42.78061-38.46338,62.61713-31.723,9.45821,3.21391,16.51306,12.30585,20.65884,23.75555,7.18228,19.83583,5.63354,46.74807-7.27561,62.43278C315.994,265.59435,308.40616,274.81382,296.64555,276.02865Z",
  
      style: { originX: 0.7, originY: 0.85 },
      pokers: [
        {
          x1: "278.50402",
          y1: "165.10288",
          x2: "280.73636",
          y2: "175.14129"
        },
        {
          x1: "264.158",
          y1: "207.76954",
          x2: "273.49134",
          y2: "212.88065"
        },
        {
          x1: "305.71356",
          y1: "207.76954",
          x2: "301.27724",
          y2: "217.54732"
        },
        {
          x1: "287.04689",
          y1: "240.65843",
          x2: "297.26912",
          y2: "248.43621"
        },
        {
          x1: "335.72385",
          y1: "196.8251",
          x2: "325.16833",
          y2: "200.85474"
        },
        {
          x1: "243.49134",
          y1: "254.07839",
          x2: "251.6475",
          y2: "246.49631"
        }
      ]
    },
    {
      index: 6,
      zIndex: 0,
  
      pathVariants: generateStageBasedPathVariants(6),
      pokerVariants: generateStageBasedPokerVariants(6),
      path:
        "M42.44885,267.15306c-24.81191.89266-41.05731,36.50893-39.8898,52.94541,1.86042,26.19106,70.2062,52.94989,94.15916,31.48968,9.558-8.56329,9.24233-22.29129,9.17384-24.10922C105.01563,304.222,69.93975,266.164,42.44885,267.15306Z",
  
      style: { originX: 1.1, originY: 0.7 },
      pokers: [
        {
          x1: "84.21344",
          y1: "277.00593",
          x2: "79.41235",
          y2: "283.78967"
        },
        {
          x1: "20.158",
          y1: "265.3251",
          x2: "24.17409",
          y2: "274.59219"
        },
        {
          x1: "2.5",
          y1: "341.99176",
          x2: "10.90746",
          y2: "335.63131"
        },
        {
          x1: "45.158",
          y1: "364.55331",
          x2: "48.31739",
          y2: "355.93672"
        },
        {
          x1: "28.158",
          y1: "315.71893",
          x2: "38.82467",
          y2: "313.27102"
        },
        {
          x1: "69.82467",
          y1: "313.27102",
          x2: "72.158",
          y2: "326.02226"
        }
      ]
    },
  
    {
      index: 1,
      zIndex: 3,
  
      pathVariants: generateStageBasedPathVariants(1),
      pokerVariants: generateStageBasedPokerVariants(1),
      path:
        "M259.86109,374.99486c-22.04407-20.96753-65.43179-20.98365-88.628,1.18164-33.65283,32.15722-13.37241,100.07544,23.63412,117.57959,2.92829,1.38525,18.80625,8.53051,36.04206,2.36352C270.14008,482.083,293.718,407.198,259.86109,374.99486Z",
      style: {
        originX: 0.7,
        originY: 1
      },
      pokers: [
        {
          x1: "215.12017",
          y1: "347.3251",
          x2: "215.12017",
          y2: "359.40787"
        },
        {
          x1: "148.38023",
          y1: "449.10288",
          x2: "157.71356",
          y2: "444.88562"
        },
        {
          x2: "268.82467",
          y2: "380.99176",
          x1: "276.1213",
          y1: "375.3251"
        },
        {
          x1: "189.77116",
          y1: "405.44416",
          x2: "195.38727",
          y2: "414.38771"
        },
        {
          x1: "238.72068",
          y1: "442.21104",
          x2: "229.33419",
          y2: "447.56019"
        },
        {
          x1: "197.71356",
          y1: "455.54732",
          x2: "203.93578",
          y2: "464.21399"
        },
        {
          x1: "238.18414",
          y1: "397.07001",
          x2: "232.4652",
          y2: "405.44416"
        },
        {
          x1: "285.35142",
          y1: "437.10288",
          x2: "276.1213",
          y2: "435.3251"
        },
        {
          x1: "153.04689",
          y1: "376.65843",
          x2: "163.96397",
          y2: "384.8584"
        }
      ]
    },
    {
      index: 2,
      zIndex: 4,
  
      pathVariants: generateStageBasedPathVariants(2),
      pokerVariants: generateStageBasedPokerVariants(2),
      path:
        "M155.49134,302.8806c-32.76575-7.3728-65.92328,19.45141-67.55554,43.55566-2.14576,31.68677,49.83264,63.917,84,52,2.102-.73315,18.3511-6.68042,24.88888-22.66675C207.15088,350.51951,189.07349,310.437,155.49134,302.8806Z",
      style: { originX: 0.9, originY: 0.7 },
      pokers: [
        {
          x1: "84.21344",
          y1: "374.1781",
          x2: "92.73929",
          y2: "369.02081"
        },
  
        {
          x1: "199.72298",
          y1: "326.02226",
          x2: "192.57922",
          y2: "332.60779"
        },
        {
          x1: "131.55669",
          y1: "407.76954",
          x2: "133.84426",
          y2: "397.07001"
        },
        {
          x1: "111.00529",
          y1: "356.39816",
          x2: "123.00529",
          y2: "358.45991"
        },
        {
          x1: "146.49134",
          y1: "330.96141",
          x2: "146.49134",
          y2: "340.73919"
        },
        {
          x1: "170.04864",
          y1: "359.41527",
          x2: "169.13101",
          y2: "369.69135"
        },
        {
          x1: "106.37342",
          y1: "301.27262",
          x2: "112.4106",
          y2: "309.88839"
        }
      ]
    },
  
    {
      index: 5,
      zIndex: 5,
  
      pathVariants: generateStageBasedPathVariants(5),
      pokerVariants: generateStageBasedPokerVariants(5),
      path:
        "M140.61414,319.1245c-31.45813-13.637-44.54468-95.57422-5.33331-122.66651,18.92889-13.07861,49.69037-13.13086,66,2,29.19049,27.08081,8.99277,99.92725-30.66669,118C166.264,318.44041,152.98993,324.48924,140.61414,319.1245Z",
  
      style: { originX: 0.55, originY: 0.9 },
      pokers: [
        {
          x1: "218.82467",
          y1: "269.99176",
          x2: "209.38774",
          y2: "268.56296"
        },
        {
          x1: "146.49134",
          y1: "178.65843",
          x2: "148.38023",
          y2: "190.01758"
        },
        {
          x1: "101.158",
          y1: "231.99176",
          x2: "112.4106",
          y2: "236.29173"
        },
        {
          x1: "215.12016",
          y1: "196.8251",
          x2: "206.89844",
          y2: "205.10288"
        },
        {
          x1: "146.49134",
          y1: "218.99176",
          x2: "153.04689",
          y2: "230.01856"
        },
        {
          x1: "189.77116",
          y1: "239.24404",
          x2: "177.82467",
          y2: "246.49631"
        },
        {
          x1: "147.43578",
          y1: "272.68677",
          x2: "151.49134",
          y2: "281.3251"
        },
        {
          x1: "183.79792",
          y1: "269.99176",
          x2: "175.49134",
          y2: "279.19261"
        }
      ]
    }
  ];
  
  const sunVariants = {
    0: {
      x: -25,
      y: -20,
      scale: 0
    },
    1: {
      x: -25,
      y: -40,
      scale: 1
    },
    2: {
      x: 0,
      y: -205,
      scale: 1.1
    },
    3: {
      x: 44.4,
      y: -335,
      scale: 1.2
    },
    4: {
      x: 130.8,
      y: -411.2,
      scale: 1.3
    },
    5: {
      x: 234.1,
      y: -463,
      scale: 1.3
    },
    6: {
      x: 336.6,
      y: -463,
      scale: 1.2
    },
    7: {
      x: 420.3,
      y: -420,
      scale: 1.1
    }
  };
  
  const generateStageBasedSunRayVariants = () =>
    [0, -50, -100, -150, -200, -250, -300, -350].reduce(
      (acc, curr, index) => ({
        ...acc,
        [index]: {
          strokeDashoffset: curr
        }
      }),
      {}
    );
  
  const Cactus = () => {
    const [stage, setStage] = useState(4);
    const [staggerDirection, setStaggerDirection] = useState(1);
  
    useEffect(() => {
      const sequence = (start:any, count:any, callback:any, interval:any) => {
        if (start === count) return;
        setTimeout(() => {
          callback(start);
          sequence(start + 1, count, callback, interval);
        }, interval);
      };
  
      sequence(4, 8, (i:number) => setStage(i), 500);
    }, []);
  
    return (
      <div className="cactus">
        <motion.div className="canvas">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-150 -200 750.20661 751.09161"
          >
            <AnimatePresence>
              {nodes
                .filter((node) => node.index <= stage)
                .map((node, i) => {
                  return (
                    <motion.g
                      key={node.path}
                      className="cactus"
                      fill="#4da792"
                      stroke="#214121"
                      stroke-miterlimit="10"
                      stroke-width="5"
                      stroke-linecap="round"
                      variants={node.pathVariants}
                      initial="0"
                      exit="0"
                      animate={stage + ""}
                      style={node.style}
                    >
                      <motion.path
                        transition={{
                          type: "spring",
                          duration: 0.2
                        }}
                        d={node.path}
                      />
                      {node.pokers.map((poker) => (
                        <motion.line
                          variants={node.pokerVariants}
                          pathLength="100"
                          strokeDasharray="100 400"
                          transition={{
                            type: "spring",
                            duration: 0.2
                          }}
                          {...poker}
                        />
                      ))}
                    </motion.g>
                  );
                })}
            </AnimatePresence>
            <motion.g
              initial="5"
              variants={sunVariants}
              animate={stage + ""}
              style={{ originX: 0.5, originY: 0.5 }}
              transition={{
                type: "spring",
                staggerChildren: 0.3
              }}
            >
              <circle cx="8.13885" cy="474.06775" r="46.0243" fill="#eb6751" />
              <motion.circle
                variants={generateStageBasedSunRayVariants()}
                cx="8.13886"
                cy="474.06775"
                r="71.5677"
                fill="none"
                stroke="#eb6751"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="5"
                stroke-dasharray="20.4405 20.4405"
              />
            </motion.g>
          </motion.svg>
        </motion.div>
        <ReactSlider
          min={0}
          max={7}
          value={stage}
          onChange={(value) => {
            setStaggerDirection(value < stage ? -1 : 1);
            setStage(value);
          }}
          marks={true}
          renderMark={(props) => {
            return (
              <svg
                className={`mark ${
                  props.key === 0 || props.key === 7 ? "end" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 5 7.08333"
              >
                <line x1="2.5" y1="4.58333" x2="2.5" y2="2.5" />
              </svg>
            );
          }}
          // renderTrack={(props, state) => {
          //   if (props.key === "track-1") return;
          //   return (
          //     <motion.svg
          //       className="track"
          //       xmlns="http://www.w3.org/2000/svg"
          //       viewBox="0 0 238.63796 15.34407"
          //     >
          //       <polygon points="2.712 3.511 63.768 3.249 236.138 2.511 236.138 7.677 236.138 12.844 2.545 12.844 2.712 3.511" />
          //     </motion.svg>
          //   );
          // }}
          // renderThumb={({ style: { left, ...style }, ...props }) => {
          //   return (
          //     <motion.svg
          //       xmlns="http://www.w3.org/2000/svg"
          //       viewBox="0 0 21.4724 37.60286"
          //       className="thumb"
          //       initial={false}
          //       animate={{
          //         x: left,
          //         y: "-50%"
          //       }}
          //       whileFocus={{ rotate: 10 }}
          //       style={{ ...style, originX: 0.5, originY: 0.5 }}
          //       {...props}
          //     >
          //       <polygon points="2.893 2.5 18.972 2.5 18.972 35.056 2.528 34.747 2.893 2.5" />
          //       <line x1="10.38907" y1="11.97222" x2="17.30574" y2="11.97222" />
          //       <line x1="16.88907" y1="19.91667" x2="10.38907" y2="19.91667" />
          //       <line x1="2.61362" y1="27.18813" x2="9.76886" y2="27.18813" />
          //     </motion.svg>
          //   );
          // }}
          className="slider"
        />
      </div>
    );
  };
  
export default Cactus
  // ReactDOM.render(<App />, document.getElementById("cactus"));
  