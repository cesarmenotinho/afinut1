
    function atomiApplyParams({inputUrl}) {
      try {
        console.log(inputUrl)
        const inputUrlObj = new URL(inputUrl, window.location.origin);
        const currentPageParams = new URLSearchParams(window.location.search);
        const inputUrlParams = new URLSearchParams(inputUrlObj.search);
      
        // Iterate over all parameters in the current page's URL
        for (const [key, value] of currentPageParams) {
          // If the input URL does not already contain the parameter, add it
          if (!inputUrlParams.has(key)) {
            inputUrlParams.append(key, value);
          }
        }
      
        // Construct the final URL
        const finalUrl = inputUrlObj.origin + inputUrlObj.pathname + '?' + inputUrlParams.toString();
        console.log(finalUrl)
        return finalUrl;
      } catch (error) {
        console.log(error);
      }
    }

    function atomiFormatDate(options = { slated: false, addDate: 0 }) {
      try {
        const defaultOptions = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };

        const today = new Date();

        if (options.slated) {
          const slatedDate = new Date(today);
          slatedDate.setDate(slatedDate.getDate() + (options.addDate || 0));

          const day = slatedDate.getDate().toString().padStart(2, "0");
          const month = (slatedDate.getMonth() + 1).toString().padStart(2, "0");
          const year = slatedDate.getFullYear();
          return `${day}/${month}/${year}`;
        }

        if(options.addDate){
          today.setDate(today.getDate()+options.addDate)
        }
        const formattedDate = today.toLocaleDateString(undefined, defaultOptions);

        return formattedDate;
      } catch (error) {
        console.log(error);
      }
    };

    function atomiFormatTime() {
      try {
        const now = new Date();
        return now.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
      } catch (error) {
        console.log(error);
      }
    };
    function runDelayedFunctions(data) {
      try {
        document.querySelectorAll('.atomicat-delay').forEach(el => el.classList.remove('atomicat-delay'));
        if(data?.setDisplayed){
          localStorage.setItem(data?.setDisplayed, true);
        }
        
    var scrollElement = document.getElementById("dtc");
    if (scrollElement) {
      scrollElement.scrollIntoView({ behavior: 'smooth' });
    }
      } catch (error) {
        console.log(error);
      }
    }
  
      (function() {
        function atomiRdn(e, t) {
          try {
            return Math.floor(Math.random() * (t - e + 1) + e)
          } catch (error) {
            console.log(error);
          }
        }

        try {
          let initial = atomiRdn(400,700);
          setInterval(() => {
            document.querySelectorAll('.atomicat-random').forEach(el => {
              el.innerText = initial.toString();
            });
            initial += atomiRdn(-1, 2);
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      })();
    
      (function() {
        function atomiEleCountdown() {
          try {
            document.querySelectorAll('.atomicat-countdown-text').forEach(el => {
              const dateTime = el.getAttribute("data-time");
              const compKey = el.getAttribute("id").split("-")[el.getAttribute("id").split("-")?.length-1];
              const intervalName = 'atomicat_countdown_text_interval_' + compKey;

              window[intervalName] = setInterval(function updateCountdownText() {
                let targetTime; 
                const findDelayParent = el.closest('.atomicat-delay') || el.closest('.atomicat-hidden');
                if (findDelayParent) return;
                const sessionStorageKey = 'atomicat_countdown_text_interval_' + compKey;
                let countdownStart = sessionStorage.getItem(sessionStorageKey);
                if (!countdownStart) {
                  countdownStart = new Date().getTime();
                  sessionStorage.setItem(sessionStorageKey, countdownStart);
                }
                const [dateTimeMins, dateTimeSecs] = dateTime.split(":").map(Number);
                targetTime = new Date(parseInt(countdownStart));
                targetTime.setMinutes(targetTime.getMinutes() + dateTimeMins);
                targetTime.setSeconds(targetTime.getSeconds() + dateTimeSecs);
    
                const now = new Date();
                const distance = targetTime - now;
    
                if (distance <= 0) {
                  clearInterval(window[intervalName]);
                  const countdownContainer = document.getElementById('atomicat-countdown-text-' + compKey);
                  countdownContainer.textContent = "00:00"
                  return;
                }
    
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
                const countdownContainer = document.getElementById('atomicat-countdown-text-' + compKey);
                if(countdownContainer) {
                  let timeHours = hours < 10 ? `0${hours}` : hours;
                  let timeMinutes = minutes < 10 ? `0${minutes}` : minutes;
                  let timeSeconds = seconds < 10 ? `0${seconds}` : seconds;
                  countdownContainer.textContent = timeMinutes+":"+timeSeconds
                }
              }, 1000);
            });
          } catch (error) {
            console.log(error);
          }
        }
        try {
          const hasCountdownText = document.querySelectorAll('.atomicat-countdown-text')
          console.log(hasCountdownText)
          if(hasCountdownText?.length){
            atomiEleCountdown()
          }
        } catch (error) {
          console.log(error);
        }
      })();
    
      (function() {
        const progressbarList = [{"style":{"progressbar":{"wrapper":{"height":{"desktop":"100%","mobile":"100%"},"borderBottomLeftRadius":{"desktop":"32px"},"borderTopLeftRadius":{"desktop":"32px"},"borderTopRightRadius":{"desktop":"32px"},"borderBottomRightRadius":{"desktop":"32px"}},"bar":{"transitionDuration":"10","background":"rgba(119, 153, 71, 1)","color":"rgba(119, 153, 71, 1)","width":"100%","lineHeight":{"desktop":"14px"}}},"outer":{"borderBottomLeftRadius":{"desktop":"32px"},"tooltip":{"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;","mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"},"marginRight":{"desktop":"29%","mobile":"10%"},"borderBottomRightRadius":{"desktop":"32px"},"marginTop":{"desktop":"0%"},"marginLeft":{"desktop":"29%","mobile":"10%"},"borderTopRightRadius":{"desktop":"32px"},"borderTopLeftRadius":{"desktop":"32px"}}},"compKey":"a157e95f-c140-413a-9255-d44f32f84c8d","misc":{"innerText":".","max":100,"tag":"progress","interactivequiz":{"continue":true},"hidePercentage":true,"value":50,"type":"progressbar"}}];

        progressbarList.forEach(function(progressbar) {
          if(progressbar.misc.hidePercentage || !progressbar.misc.percentageRise) {
            return;
          }
          const barHtml = document.querySelector(".atomicat-progress-percentage-" + progressbar.compKey.slice(0, 7));
          let width = 0;
          let interval = 30;
          const completeWidth = parseInt((progressbar?.style?.progressbar?.bar?.width || "50%").replace("%", ""));
          let duration = parseInt(progressbar?.style?.progressbar?.bar?.transitionDuration?.replace("s", "") || 1) * 1000;
          let increment = (interval / duration) * completeWidth;
          let id = setInterval(frame, interval);
          function frame() {
            if (width >= completeWidth) {
              clearInterval(id);
            } else {
              width += increment;
              barHtml.innerText = (width > completeWidth ? completeWidth : Math.round(width)) + "%";
            }
          }
        });
      })();
    (function() {

    try {
        const conditionalDisplayList = [{"misc":{"placeholder":"Answer...","optionType":"text","type":"quizoption","conditionalDisplay":{"active":true,"visibility":"hideWithoutCondition"}},"style":{"outer":{"tooltip":{"arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"}}},"compKey":"249bce6f-ead1-4bee-b016-d817396533e2"},{"compKey":"cd9f9b8a-546d-4e73-a89d-e17632831ffd","misc":{"placeholder":"Answer...","conditionalDisplay":{"visibility":"hideWithoutCondition","active":true},"type":"quizoption","optionType":"text"},"style":{"outer":{"tooltip":{"arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"}}}}];
        conditionalDisplayList.forEach((item) => {
            const { type, conditionalDisplay } = item.misc;
            const { visibility = "visible", logics, applicable = "trueAll" } = conditionalDisplay;
            const key = item?.compKey?.slice(0, 7) || item?.contKey?.slice(0, 7);
            const elementClass = type === "container" ? ".atomicat-container-" + key : ".atomicat-element-container-" + key;
            const targetElement = document.querySelector(elementClass);
            const showItem = () => {
              targetElement.classList.remove("atomicat-hidden");
            }

            const visibilityFxn = (logic) => {
                if(visibility === "visible") {
                  return !logic;
                } else {
                  return logic; 
                }
              }
            const resultArr = [];
            
            if(visibility !== "hideWithoutCondition" &&  logics?.length ) {
              for (let i = 0; i < logics?.length; i++) {
                  const logic = logics[i];
                  const { type } = logic;
                  if(type === "dateAndTime") {
                     const { date, date2, dateCondition = "between" } = logic;
                      const currentDate = new Date().getTime();
                      const fromDate = new Date(date).getTime();
                      const toDate = new Date(date2).getTime();
                      const logicObj = {
                        between: currentDate >= fromDate && currentDate <= toDate,
                        notBetween: currentDate < fromDate || currentDate > toDate,
                      }

                      resultArr.push(logicObj[dateCondition]);
                  } else if(type === "query") {
                     const { query, queryCondition = "include" } = logic;
                    const windowQuery = window.location.search;

                    const urlParams = new URLSearchParams(window.location.search);
                    const param = query.split("=")

                    const includeQuery = param.length > 1 ? urlParams?.get(param[0])?.includes(param[1]) : urlParams?.get(param[0]) != null;
                    const queryObj = {
                      include: includeQuery,
                      exclude: !includeQuery,
                    }

                    resultArr.push(queryObj[queryCondition]);
                  } else if(type === "browser") {
                    const { browsers, browserCondition = "include" } = logic; 
                    const iphoneKeyWords = ["iPhone", "iPad", "iPod", "Macintosh"];
                    const { userAgent } = navigator;
                    const isIphone = iphoneKeyWords.some((item) => userAgent.includes(item));
                    const chromeBrowsers = ["Edg", "OPR"];
                    const nonIphoneAgent = (chromeBrowsers.some(item => userAgent.includes(item)) ? userAgent.replace("Chrome", "") : userAgent)?.replace("Safari", "");
                    const iphoneAgent = userAgent.replace("Safari", "");
                    const isSafariOnIOS = /Safari/.test(userAgent) && !/CriOS|FxiOS|EdgiOS|OPT/.test(userAgent);
                    const updateUserAgent = isIphone ? iphoneAgent : nonIphoneAgent;
                    const isBrowser = isIphone && isSafariOnIOS ? true : browsers.find((browser) => updateUserAgent.includes(isIphone ? browser?.ios : browser?.value)) ? true : false;
                    const browserObj = {
                      include: isBrowser,
                      exclude: !isBrowser
                    }

                    resultArr.push(browserObj[browserCondition]);
                  }
              }


              const allTrue = resultArr.every((item) => item === true);
              const oneTrue = resultArr.some((item) => item === true);

              const applicableObj = {
                trueAll: allTrue,
                trueAny: oneTrue  
              }
              const isApplicable = applicableObj[applicable];

              const visibilityObj = {
                visible: isApplicable,
                hidden: !isApplicable
              }

              const isVisibility = visibilityObj[visibility];

              if(isVisibility) {
                showItem();
              }

            }
            
          })
    } catch (error) {
        return error;
    }
    })();
  (function() {
      try{
          const interactivequizList = [{"contents":[{"style":{"container":{"flexDirection":{"desktop":"column"}}},"misc":{"type":"container","tag":"div","tab":{"title":"Question 1...?"},"required":true},"contKey":"54d1e4ec-5fb3-4dc4-a233-d68dab267816","contents":[{"style":{"text":{"textAlign":{"desktop":"center"},"fontWeight":{"desktop":"700"},"fontSize":{"desktop":"42px","mobile":"24px"}},"outer":{"marginBottom":{"mobile":"24px"},"tooltip":{"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;","mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"}}}},"misc":{"tag":"h3","type":"text","content":"See If You Qualify"},"compKey":"a75cf85c-a67a-4e5b-8dc8-b52dea3f63d4"},{"misc":{"tag":"p","hideOnMobile":true,"type":"text","content":"You're just **one step away** from achieving the __body you desire! __Simply provide 5 quick details about yourself, and **we'll ensure that the exclusive Lipozem formula** is perfectly __tailored to meet your needs__."},"compKey":"aad57f55-2374-441a-a30f-3f612539cdad","style":{"outer":{"marginBottom":{"desktop":"20px"},"tooltip":{"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;","mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"},"marginTop":{"desktop":"12px"},"paddingRight":{"desktop":"15%"},"paddingLeft":{"desktop":"15%"}},"text":{"fontSize":{"desktop":"24px"},"textAlign":{"desktop":"center"},"lineHeight":{"desktop":"30px"}}}},{"compKey":"80f176d4-63ac-42d2-9734-9e853aea72f9","misc":{"tag":"h3","type":"text","content":"What's your sex?\n"},"style":{"text":{"fontFamily":"Roboto","fontWeight":{"desktop":"600"},"fontSize":{"desktop":"24px","mobile":"20px"},"textAlign":{"desktop":"center"}}}},{"misc":{"content":[{"ref":"44bde092-4296-4ff6-a854-c15b2b2fac2c","text":"Female"},{"ref":"b13f2ff1-8be6-4254-843f-b591bf954114","text":"Male"}],"type":"quizoption","optionType":"checkbox"},"compKey":"aca694ab-32f8-41fe-bdbd-927bac2cbd02","style":{"quizoption":{"width":{"desktop":"21%","mobile":"72%"},"background":"linear-gradient(360deg, rgba(0, 0, 0, 0.13) 0%, rgba(255, 255, 255, 1) 99%)"}}}]},{"misc":{"tab":{"title":"Question 1...?"},"required":true,"tag":"div","type":"container"},"contKey":"7ccd42be-20ca-4931-97b5-4c4ea4e9c5e6","style":{"container":{"flexDirection":{"desktop":"column"}}},"contents":[{"misc":{"tag":"h3","content":"See If You Qualify\n","type":"text"},"style":{"text":{"textAlign":{"desktop":"center"},"fontWeight":{"desktop":"700"},"fontSize":{"desktop":"42px","mobile":"24px"}},"outer":{"tooltip":{"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"}},"marginBottom":{"mobile":"24px"}}},"compKey":"107aea14-b2bd-4307-9c5d-d0b5d605cdcd"},{"style":{"outer":{"marginTop":{"desktop":"12px"},"paddingRight":{"desktop":"15%"},"tooltip":{"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;","mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"},"paddingLeft":{"desktop":"15%"},"marginBottom":{"desktop":"20px"}},"text":{"textAlign":{"desktop":"center"},"lineHeight":{"desktop":"30px"},"fontSize":{"desktop":"24px"}}},"compKey":"e999bfc9-a891-44bf-bdb1-827b1b9b1371","misc":{"hideOnMobile":true,"content":"You're just **one step away** from achieving the __body you desire! __Simply provide 5 quick details about yourself, and **we'll ensure that the exclusive Lipozem formula** is perfectly __tailored to meet your needs__.","tag":"p","type":"text"}},{"style":{"outer":{"tooltip":{"arrow":{"mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"}},"text":{"fontSize":{"desktop":"24px","mobile":"20px"},"textAlign":{"desktop":"center"},"fontWeight":{"desktop":"600"},"fontFamily":"Roboto"}},"compKey":"df0360c1-b04b-4e83-9d84-1acbc5aa10d3","misc":{"type":"text","tag":"h3","content":"How tall are you?\n"}},{"misc":{"content":[{"ref":"0a00578c-5c9c-48ea-92d9-0d61b71f7ed7","text":"4'11\" and under"},{"ref":"7d63ab46-08db-4b8b-b69c-2fa2a4512368","text":"5'0\" \" 5'4\""},{"ref":"b11f8bfe-ee1c-472c-9d3f-a3aa53fe90a2","text":"5'5\" \" 5'9\""}],"optionType":"checkbox","type":"quizoption"},"style":{"quizoption":{"background":"linear-gradient(360deg, rgba(0, 0, 0, 0.13) 0%, rgba(255, 255, 255, 1) 99%)","width":{"mobile":"60%","desktop":"18%"}}},"compKey":"994a3f7a-8787-4c21-b499-48204ead3e61"}]},{"contents":[{"misc":{"tag":"h3","type":"text","content":"See If You Qualify\n"},"style":{"text":{"textAlign":{"desktop":"center"},"fontSize":{"desktop":"42px","mobile":"24px"},"fontWeight":{"desktop":"700"}},"outer":{"tooltip":{"arrow":{"mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"}}},"compKey":"c0bc427c-f8fb-4f7b-b038-ab718de4f8f6"},{"compKey":"e271bbf9-f42b-41f0-8afb-29d5c3ea9916","misc":{"content":"You're just **one step away** from achieving the __body you desire! __Simply provide 5 quick details about yourself, and **we'll ensure that the exclusive Lipozem formula** is perfectly __tailored to meet your needs__.","tag":"p","hideOnMobile":true,"type":"text"},"style":{"text":{"textAlign":{"desktop":"center"},"lineHeight":{"desktop":"30px"},"fontSize":{"desktop":"24px"}},"outer":{"tooltip":{"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;","desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"},"marginTop":{"desktop":"12px"},"paddingLeft":{"desktop":"15%"},"marginBottom":{"desktop":"20px"},"paddingRight":{"desktop":"15%"}}}},{"style":{"outer":{"marginTop":{"mobile":"20px"},"tooltip":{"arrow":{"mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"}},"text":{"fontSize":{"desktop":"24px","mobile":"20px"},"fontFamily":"Roboto","textAlign":{"desktop":"center"},"fontWeight":{"desktop":"600"}}},"compKey":"2e645ba2-926b-4b8e-afcb-61ddfb96e547","misc":{"tag":"h3","type":"text","content":"What's your age?\n"}},{"style":{"quizoption":{"width":{"desktop":"18%","mobile":"61%"},"background":"linear-gradient(360deg, rgba(0, 0, 0, 0.13) 0%, rgba(255, 255, 255, 1) 99%)"}},"compKey":"a24e9bd8-5494-4d34-9e56-e6c1699d26f9","misc":{"type":"quizoption","optionType":"checkbox","content":[{"ref":"8be0e748-ea5f-45c6-a1a1-50c8eec7c1e3","text":"45 and above"},{"ref":"4c5f3f0a-7954-4944-8c03-580dac72d102","text":"35-44"},{"ref":"1da6f191-9733-4b7a-ade3-10141e9995ce","text":"25-34"},{"text":"Under 25","ref":"8d8338f8-827b-4029-b96b-7c7c572d5400"}]}}],"contKey":"edbf33f8-2d02-4d70-8835-6e354a74c2d8","style":{"container":{"flexDirection":{"desktop":"column"}}},"misc":{"required":true,"type":"container","tab":{"title":"Question 1...?"},"tag":"div"}},{"contents":[{"compKey":"682b9830-8ecb-4b09-a101-22d23b3fb0e5","misc":{"type":"text","tag":"h3","content":"See If You Qualify"},"style":{"outer":{"tooltip":{"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"}},"paddingBottom":{"mobile":"24px"}},"text":{"textAlign":{"desktop":"center"},"fontSize":{"desktop":"42px","mobile":"24px"},"fontWeight":{"desktop":"700"}}}},{"compKey":"37c1fb7f-e30b-4356-a47b-6349f7acc6b7","style":{"outer":{"marginBottom":{"desktop":"20px"},"paddingRight":{"desktop":"15%"},"marginTop":{"desktop":"10px"},"tooltip":{"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;","mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"},"paddingLeft":{"desktop":"15%"}},"text":{"textAlign":{"desktop":"center"},"fontSize":{"desktop":"24px"},"lineHeight":{"desktop":"30px"}}},"misc":{"conditionalDisplay":{"active":false},"tag":"p","type":"text","hideOnMobile":true,"content":"You're just **one step away** from achieving the __body you desire! __Simply provide 5 quick details about yourself, and **we'll ensure that the exclusive Lipozem formula** is perfectly __tailored to meet your needs__."}},{"style":{"text":{"fontWeight":{"desktop":"600"},"fontSize":{"mobile":"20px","desktop":"24px"},"fontFamily":"Roboto","textAlign":{"desktop":"center"}}},"compKey":"688f4c2c-225b-4eed-b705-7fb5684de896","misc":{"tag":"h3","type":"text","content":"What's your weight?\n"}},{"style":{"quizoption":{"width":{"desktop":"18%","mobile":"66%"},"background":"linear-gradient(360deg, rgba(0, 0, 0, 0.13) 0%, rgba(255, 255, 255, 1) 99%)"}},"misc":{"type":"quizoption","content":[{"text":"Under 120 lbs","ref":"73025647-30c0-4a9a-942b-c33211406c18"},{"text":"120-159 Ibs","ref":"33fed68c-e967-470b-bfad-ed6e834b2ba9"},{"ref":"cbbe3edb-b50a-4875-a860-33e8ae40cef5","text":"160-199 |bs"},{"text":"200 lbs and above","ref":"1f3bc79f-aa9f-43c6-8fe4-831d97310ee3"}],"optionType":"checkbox"},"compKey":"4e667a31-ea91-4cfd-9a80-43751cb3024a"}],"misc":{"tag":"div","type":"container","tab":{"title":"Question 1...?"},"required":true},"style":{"container":{"flexDirection":{"desktop":"column"}}},"contKey":"e459daf2-8516-4ef4-ac60-9722d0ea4a56"},{"misc":{"type":"container","tab":{"title":"Question 1...?"},"tag":"div","required":true},"contKey":"02805854-107e-415a-86d6-ae8bf277ffdc","contents":[{"style":{"text":{"textAlign":{"desktop":"center"},"fontWeight":{"desktop":"700"},"fontSize":{"desktop":"42px","mobile":"24px"}},"outer":{"marginBottom":{"mobile":"24px"},"tooltip":{"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"}}}},"compKey":"dbddb6c4-4ae3-49c8-b39b-a7178a9f6296","misc":{"type":"text","tag":"h3","content":"See If You Qualify\n"}},{"misc":{"hideOnMobile":true,"content":"You're just **one step away** from achieving the __body you desire! __Simply provide 5 quick details about yourself, and **we'll ensure that the exclusive Lipozem formula** is perfectly __tailored to meet your needs__.","tag":"p","type":"text"},"compKey":"d73203fa-5af3-4ba9-8004-fdf3e4e478dd","style":{"text":{"textAlign":{"desktop":"center"},"lineHeight":{"desktop":"30px"},"fontSize":{"desktop":"24px"}},"outer":{"paddingLeft":{"desktop":"15%"},"paddingRight":{"desktop":"15%"},"marginBottom":{"desktop":"20px"},"tooltip":{"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;","mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"}},"marginTop":{"desktop":"10px"}}}},{"style":{"text":{"fontWeight":{"desktop":"600"},"textAlign":{"desktop":"center"},"fontFamily":"Roboto","fontSize":{"desktop":"24px","mobile":"20px"}},"outer":{"tooltip":{"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"}}}},"misc":{"tag":"h3","content":"How many lbs do you want to lose?\n","type":"text"},"compKey":"25d9bedc-65f5-42fd-83fa-4d37643d462f"},{"compKey":"b7026925-52cf-4f48-b920-e81512f35fc3","style":{"quizoption":{"width":{"desktop":"18%","mobile":"65%"},"background":"linear-gradient(360deg, rgba(0, 0, 0, 0.13) 0%, rgba(255, 255, 255, 1) 99%)"}},"misc":{"type":"quizoption","content":[{"ref":"e175d70d-c1eb-439b-b55e-5fd18faefda7","text":"Less than 10 lbs"},{"text":"10-20 lbs","ref":"1032b44c-8c90-46a2-9fa3-cdb3c63fdd5c"},{"ref":"61b2579c-93d3-4573-a7ad-c2824858e028","text":"21-30 lbs"},{"ref":"8c916f5f-b175-4075-9cae-f2339b70a827","text":"More than 30 lbs"}],"optionType":"checkbox"}}],"style":{"container":{"flexDirection":{"desktop":"column"}}}},{"style":{"container":{"flexDirection":{"desktop":"column"}}},"contents":[{"misc":{"content":"Discover Your Perfect Lipozem Formula\n","tag":"h3","type":"text"},"compKey":"06f835b8-f176-4d05-8dee-41ce3915d31a","style":{"text":{"textAlign":{"desktop":"center"},"fontWeight":{"desktop":"700"},"fontSize":{"desktop":"42px","mobile":"28px"}},"outer":{"tooltip":{"arrow":{"mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"}}}},{"misc":{"tag":"p","content":"Complete our quick form to provide essential information, ensuring the **Lipozem** formula is __perfectly__ tailored to your body's needs.\n\n","type":"text"},"style":{"outer":{"paddingLeft":{"mobile":"0%","desktop":"15%"},"marginBottom":{"desktop":"20px"},"paddingRight":{"mobile":"0%","desktop":"15%"},"marginTop":{"desktop":"12px"},"tooltip":{"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;","mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"}}},"text":{"fontSize":{"desktop":"24px","mobile":"17px"},"lineHeight":{"desktop":"30px","mobile":"22px"},"textAlign":{"desktop":"center"}}},"compKey":"6d4b8cd4-cc54-4a8c-8241-63ecd14adf76"},{"misc":{"content":"Please wait while we prepare the **ideal formula** for you","tag":"p","type":"text"},"style":{"outer":{"tooltip":{"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;","mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"},"paddingBottom":{"desktop":"12px"}},"text":{"textAlign":{"desktop":"center"},"fontSize":{"desktop":"20px","mobile":"18px"}}},"compKey":"b1802acc-3b60-4dc3-aa35-32b0ab93717b"},{"style":{"progressbar":{"wrapper":{"height":{"desktop":"100%","mobile":"100%"},"borderBottomLeftRadius":{"desktop":"32px"},"borderTopLeftRadius":{"desktop":"32px"},"borderTopRightRadius":{"desktop":"32px"},"borderBottomRightRadius":{"desktop":"32px"}},"bar":{"transitionDuration":"10","background":"rgba(119, 153, 71, 1)","color":"rgba(119, 153, 71, 1)","width":"100%","lineHeight":{"desktop":"14px"}}},"outer":{"borderBottomLeftRadius":{"desktop":"32px"},"tooltip":{"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;","mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"},"marginRight":{"desktop":"29%","mobile":"10%"},"borderBottomRightRadius":{"desktop":"32px"},"marginTop":{"desktop":"0%"},"marginLeft":{"desktop":"29%","mobile":"10%"},"borderTopRightRadius":{"desktop":"32px"},"borderTopLeftRadius":{"desktop":"32px"}}},"compKey":"a157e95f-c140-413a-9255-d44f32f84c8d","misc":{"innerText":".","max":100,"tag":"progress","interactivequiz":{"continue":true},"hidePercentage":true,"value":50,"type":"progressbar"}},{"compKey":"4e93f869-e065-4093-99e5-702ba216b775","style":{"text":{"fontSize":{"desktop":"14px"},"textAlign":{"desktop":"center"}},"outer":{"marginTop":{"desktop":"8px"},"tooltip":{"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"}}}},"misc":{"tag":"p","content":"Time remaining: **$countdown-00:10 seconds**","type":"text"}},{"misc":{"placeholder":"Answer...","optionType":"text","type":"quizoption","conditionalDisplay":{"active":true,"visibility":"hideWithoutCondition"}},"style":{"outer":{"tooltip":{"arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"}}},"compKey":"249bce6f-ead1-4bee-b016-d817396533e2"}],"misc":{"tag":"div","type":"container","tab":{"title":"Question 6...?"},"interactivequiz":{"title":"Quiz 6"}},"contKey":"9247d6fd-4267-4759-a9c8-34827d4ab34f"},{"style":{"container":{"flexDirection":{"desktop":"column"}}},"contents":[{"contKey":"004182cc-9262-40bd-bdce-9da2ef307864","misc":{"type":"container","contentWidth":"fullWidth"},"contents":[{"style":{"text":{"color":"rgba(249, 250, 114, 1)","backgroundImage":"unset","textAlign":{"desktop":"center"},"fontSize":{"desktop":"32px","mobile":"24px"},"lineHeight":{"desktop":"44px","mobile":"28px"}}},"misc":{"content":"Claim Your Discounted Lipozem®\nBelow While Supplies Last","type":"text","tag":"h1"},"compKey":"5c63b3bd-6def-4a1f-84f3-ca975b4e1fdd"},{"misc":{"tag":"div","type":"spacer"},"compKey":"42bd87be-60b4-42a5-bba5-2c3fdcf9bec2","style":{"spacer":{"height":{"desktop":"31px"}}}},{"compKey":"55ad457a-a56e-4b23-93ad-3a2130e03e3e","style":{"text":{"fontSize":{"desktop":"55px"},"textAlign":{"desktop":"center"},"color":"rgba(255,255,255, 1)","lineHeight":{"desktop":"44px"},"backgroundImage":"unset"}},"misc":{"tag":"h1","content":"$countdown-45:00","type":"text"}}],"style":{"container":{"flexDirection":{"desktop":"column"},"width":{"desktop":"100%","mobile":"100%"},"background":{"desktop":"rgba(119, 152, 71, 1)"}},"outer":{"paddingTop":{"desktop":"40px"},"paddingBottom":{"desktop":"40px"}}}},{"style":{"container":{"flexDirection":{"desktop":"column"},"width":{"desktop":"100%","mobile":"100%"}}},"contKey":"dd174eac-5f71-484c-b0c2-cb838514137b","misc":{"contentWidth":"fullWidth","type":"container"},"contents":[{"style":{"outer":{"marginTop":{"desktop":"-2px"},"tooltip":{"arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"}},"image":{"width":{"desktop":"4%","mobile":"15%"}}},"compKey":"2d541e9b-0576-453a-8bda-06cb7617e389","misc":{"type":"image","src":"https://media.atomicatpages.net/u/ihhp2PyxJ8ZEUoIL4S5Kcx620KU2/Pictures/share/pagegYqI8MO/74c1ee2.png","tag":"img"}},{"compKey":"6c912280-592f-45cf-b631-5cff2effc2e8","style":{"text":{"fontWeight":{"desktop":"700"},"textAlign":{"desktop":"center"},"fontSize":{"mobile":"28px","desktop":"36px"},"lineHeight":{"desktop":"42px","mobile":"36px"}},"outer":{"marginTop":{"desktop":"16px","mobile":"24px"},"tooltip":{"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;","desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"}}},"misc":{"tag":"p","content":"Your Exclusive Formula is Ready\nClaim Your Discounted Lipozem®","type":"text"}}]},{"misc":{"content":"YES! I'M READY TO TRY LIPOZEM","type":"button","tag":"a"},"compKey":"ea755bfc-6da5-43f1-bc0b-c156f6f5e5cd","style":{"outer":{"tooltip":{"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;","mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"},"marginTop":{"desktop":"48px","mobile":"36px"}},"button":{"borderTopRightRadius":{"desktop":"32px"},"hover":{"background":"rgba(255, 215, 0, 1)","color":"rgba(0, 0, 0, 1)"},"paddingRight":{"desktop":"64px","mobile":"16px"},"width":{"mobile":"100%"},"fontSize":{"mobile":"18px","desktop":"23px"},"borderBottomRightRadius":{"desktop":"32px"},"background":"rgba(255, 215, 0, 1)","borderTopLeftRadius":{"desktop":"32px"},"fontWeight":{"desktop":"600"},"borderBottomLeftRadius":{"desktop":"32px"},"alignSelf":{"desktop":"center"},"paddingTop":{"desktop":"16px"},"paddingBottom":{"desktop":"16px"},"paddingLeft":{"mobile":"16px","desktop":"64px"}}}},{"compKey":"cd9f9b8a-546d-4e73-a89d-e17632831ffd","misc":{"placeholder":"Answer...","conditionalDisplay":{"visibility":"hideWithoutCondition","active":true},"type":"quizoption","optionType":"text"},"style":{"outer":{"tooltip":{"arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"},"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);"}}}}],"contKey":"d612cefe-d420-43ab-b3ba-f6b73e03419d","misc":{"tab":{"title":"Question 6...?"},"interactivequiz":{"title":"Quiz 6"},"tag":"div","type":"container"}}],"compKey":"19a7e77a-0889-44fd-815c-d6e00bef5d53","style":{"outer":{"tooltip":{"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);","arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000%20rgba(0,%200,%200,%200)%20rgba(0,%200,%200,%200);%20border-right-color:%20#555;"}}}},"misc":{"enableNxt":false,"custom":6,"type":"interactivequiz","name":"New Quiz","enablePrv":false}}];
          const atomicatInteractivequiz = JSON.stringify({forms: {}})
          const passParams = undefined;
          const notFieldGoTo = ["redirect", "showDelayedSections", "scrollToId"];
          const observeCallback = (entries) => {
              try{
                  entries.forEach(entry => {
                      if (entry.isIntersecting) {
                          const quizKey = entry?.target?.dataset?.quizKey;
                          const curQuiz = interactivequizList.find(q => q.compKey === quizKey)
                          if(curQuiz && curQuiz?.contents?.length > 0){
                              const questionId = curQuiz?.contents?.[0]?.contKey?.slice(0, 7)
                              markQuestionViewed({qid: quizKey, questionId})
                          }
                          // Perform actions as the element enters the viewport
                      } else {
                          // Perform actions as the element exits the viewport
                      }
                  });
              } catch (error) {
                  console.log(error);
              }
          };
          const quizObserver = new IntersectionObserver(observeCallback);
  
          if(!localStorage.getItem("atomicat-interactivequiz") || localStorage.getItem("atomicat-interactivequiz") === "null") {
              localStorage.setItem("atomicat-interactivequiz", atomicatInteractivequiz)
          }
          function genQuizUUID() {
              try{
                  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                      return v.toString(16);
                  });
              } catch (error) {
                  console.log(error);
              }
          }
          function getData() {
              try{
                  return JSON.parse(localStorage.getItem("atomicat-interactivequiz"))
              } catch (error) {
                  console.log(error);
                  return {}
              }
          }
          function viewTheQuiz() {
              try{
                  const hasViews = [];
                  interactivequizList.forEach((interactivequiz) => {
                      const interactivequizKey = interactivequiz?.compKey?.slice(0, 7);
                      if(!getData()?.forms?.[interactivequizKey]?.lid) {
                          hasViews.push(interactivequiz?.compKey)
                      }
                  });
                  if(hasViews?.length){
                      saveLead({qid: hasViews, type: "view"});
                  }
              } catch (error) {
                  console.log(error);
              }
          }
          viewTheQuiz()
  
          interactivequizList.forEach((interactivequiz) => {
              const interactivequizKey = interactivequiz.compKey?.slice(0, 7);
              const prevBtn = document?.querySelector(".atomicat-interactivequiz-prev-" + interactivequizKey);
              const nextBtn = document?.querySelector(".atomicat-interactivequiz-next-" + interactivequizKey);
              const interactiveContainer = document.querySelector(".atomicat-interactivequiz-container-" + interactivequizKey);
              const btncontainer = document.querySelector(".atomicat-interactivequiz-btn-container-" + interactivequizKey);
              const componentContainer = document.querySelector(".atomicat-component-container-" + interactivequizKey);
              const progressBar = document.createElement("div");
              progressBar.classList.add("atomicat-interactivequiz-progress-bar" + interactivequizKey);
              progressBar.style.width = "0%";
              progressBar.style.height = "5px";
              progressBar.style.backgroundColor = "#4CAF50";
              progressBar.style.transition = "width 1s";
              componentContainer.appendChild(progressBar);
              const successMessage = interactivequiz.misc.submission?.success?.message || "Analyzing the answers...";
              const quizElement = document.querySelector('.atomicat-element-container-'+interactivequizKey)
              const quizObserveElement = quizObserver.observe(quizElement)
              quizElement.dataset.quizKey = interactivequiz.compKey;
              const quizWithOption = interactivequiz?.contents?.map((cont) => cont?.contents?.find((item) => item?.misc?.type === "quizoption"));
  
              function animateProgressBar() {
                  let progress = 0;
                  const animationInterval = setInterval(() => {
                  if (progress < 100) {
                      progress++;
                      progressBar.style.width = progress + "%";
                  } else {
                      clearInterval(animationInterval);
                      setTimeout(() => {
                          componentContainer.style.display = "none";
                      }, 1000);
                  }
                  }, 10);
              }
  
              function interactivequizFinish() {
                  componentContainer.appendChild(document.createTextNode(successMessage));
                  interactiveContainer.remove();
                  btncontainer.remove();
                  animateProgressBar();
                  saveLead({qid: interactivequiz.compKey, type: "submit"});
                  const quizData = getData();
                  const queryResult = JSON.parse(JSON.stringify(getQueryOptions()));
                  delete quizData["forms"][interactivequizKey]
                  localStorage.setItem("atomicat-interactivequiz", JSON.stringify(quizData));
                  setTimeout(() => {
                      if (interactivequiz?.misc?.submission?.success?.action === "showDelayed") {
                          runDelayedFunctions();
                      } else if (interactivequiz?.misc?.submission?.success?.action === "redirect") {
                          window.location.href = atomiApplyParams({inputUrl: interactivequiz?.misc?.submission?.success?.redirectUrl?.trim()}) + (passParams ? queryResult : "");
                      }
                  }, 1000);
                 
              }
              
              if(!getData()?.forms?.[interactivequizKey]) {
                  const quizData = getData();
                  const fieldTypes = {}
                  interactivequiz?.contents?.forEach((cont, i) => {
                      fieldTypes[cont.contKey.slice(0, 7)] = cont?.contents?.find((item) => item?.misc?.type === "quizoption")?.misc?.optionType || "";
                  });
                  quizData["forms"][interactivequizKey] = {answers: {}, fieldTypes, lid: genQuizUUID()}
                  localStorage.setItem("atomicat-interactivequiz", JSON.stringify(quizData));
              }
              // Update startime if refreshed
              if (getData()?.forms?.[interactivequizKey]?.startTime) {
                  const quizData = getData();
                  quizData["forms"][interactivequizKey]["startTime"] = Date.now()
                  localStorage.setItem("atomicat-interactivequiz", JSON.stringify(quizData));
              }
  
              const interactiveItems = interactiveContainer.children;
              let currentSlide = 0;
              const interactiveLogic = interactivequiz.misc.logic;
  
              let interactiveContObj = {};
              let interactiveOptions = {}
              interactivequiz.contents.forEach((cont, i) => {
                  interactiveContObj[cont.contKey.slice(0, 7)] = i;
              });
  
              interactivequiz?.contents?.forEach((cont, i) => {
                  interactiveOptions[cont.contKey.slice(0, 7)] = cont?.contents?.find((item) => item?.misc?.type === "quizoption");
              });
  
              let interactiveOptionsArray = Object.keys(interactiveOptions);
              const itemObjKeys = Object.keys(interactiveContObj);
              let updatedContent = interactiveContainer.innerHTML;
                // const replaceKeys = () => {     
                //    itemObjKeys.forEach((key) => {
                //    const spanTag = document.createElement("span");
                //    spanTag.classList.add("atomicat-interactivequiz-key-" + key);
                //    updatedContent = updatedContent.replaceAll("["+key+"]", spanTag.outerHTML);
                //  });
                //  interactiveContainer.innerHTML = updatedContent;
                //}
                const replaceKeys = () => {
                    const traverseAndReplace = (node) => {
                        // If it's a text node
                        if (node.nodeType === Node.TEXT_NODE) {
                            let text = node.nodeValue;

                            itemObjKeys.forEach((key) => {
                                const placeholder = `[${key}]`;

                                if (text.includes(placeholder)) {
                                    // Split text around the placeholder
                                    const parts = text.split(placeholder);
                                    
                                    // Create a span element for the placeholder
                                    const spanTag = document.createElement("span");
                                    spanTag.classList.add("atomicat-interactivequiz-key-" + key);

                                    // Replace the current text node with new nodes
                                    const parent = node.parentNode;
                                    parent.insertBefore(document.createTextNode(parts[0]), node); // Before the placeholder
                                    parent.insertBefore(spanTag, node); // Placeholder as <span>
                                    parent.insertBefore(document.createTextNode(parts[1]), node); // After the placeholder
                                    parent.removeChild(node); // Remove the original text node
                                }
                            });
                        } else if (node.nodeType === Node.ELEMENT_NODE) {
                            // Recursively traverse child nodes
                            Array.from(node.childNodes).forEach(traverseAndReplace);
                        }
                    };

                    // Start traversing the interactiveContainer
                    traverseAndReplace(interactiveContainer);
                };
                replaceKeys();
              const localData = getData();
              const getQueryOptions = () => {
               const queryOptions = interactiveOptionsArray.map((option) => {
                return typeof getData()?.forms[interactivequizKey]?.answers?.[option]?.[0] === "object" ? "" : 
                 getData()?.forms[interactivequizKey]?.answers?.[option]?.[0] && option + "=" + encodeURIComponent(interactiveOptions[option]?.misc?.optionType === "checkbox" 
                    ? getData()?.forms[interactivequizKey]?.answers?.[option]?.map(answerForm => interactiveOptions[option]?.misc?.content?.find(itemOption => itemOption?.ref?.slice(0, 7) === answerForm)?.text) 
                    : getData()?.forms[interactivequizKey]?.answers?.[option]?.[0] || "");
                }).filter(q => q !== undefined);
              const query = queryOptions.join("&");
              console.log(query, queryOptions, "in get", interactiveOptionsArray, getData())
              return query;
            }

             let lastSlide = false;

            const moveToImmediateNextSlide = () => {
                  lastSlide = false;
                  if(currentSlide < interactiveItems.length - 1) {
                      currentSlide++
                  } else {
                      interactivequizFinish();
                      return;
                  }
                  interactiveContainer.children[currentSlide].setAttribute('data-prev', currentSlide-1);
            }

            const moveToNextSlide = ({item}) => {
                  if(!item?.contents?.find(it => it?.misc?.type === "quizoption")) {
                      const itemKey = item?.contKey?.slice(0, 7);
                      const quizData = getData()
                      quizData.forms[interactivequizKey].answers[itemKey] = [{completed: true}];
                      localStorage.setItem("atomicat-interactivequiz", JSON.stringify(quizData));
                  }
                  const itemAnswerOriginal = getData()?.forms?.[interactivequizKey]?.answers[item?.contKey?.slice(0, 7)]
                  const itemAnswer = Array.isArray(itemAnswerOriginal) ? itemAnswerOriginal?.join("") : itemAnswerOriginal;
                  if(item?.misc?.required && item?.contents?.find((it) => it?.misc?.type === "quizoption") && !itemAnswer) {
                      const requiredMessage = interactivequiz?.misc?.requiredMessage || "This field is required...";
                      const errorEle = document.createElement("div");
                      errorEle.textContent = requiredMessage;
                      errorEle.style.color = "red";
                      errorEle.style.marginTop = "10px";
                      errorEle.style.fontSize = "12px";
                      errorEle.style.fontWeight = "bold";
                      errorEle.style.textAlign = "center";
                      interactiveContainer.appendChild(errorEle);
  
                      setTimeout(() => {
                          errorEle.remove();
                      }, 2000);
                      return;
                  }
  
                  if(interactiveLogic?.find((logic) => logic?.ref === item?.contKey && logic?.actions?.length)) {
                      const logic = interactiveLogic.find((logic) => logic?.ref === item?.contKey );
                      logic.actions = [
                        ...logic?.actions?.filter(lg => lg?.condition?.op !== "always"),
                        ...logic?.actions?.filter(lg => lg?.condition?.op === "always" && lg?.details?.to?.vaue !== "auto" )
                      ]
                      let actionTriggered = false; 
                      const always = logic?.actions?.find(ac => ac?.condition?.op === "always");
                    for (let i = 0; i < logic.actions.length; i++) {
                      const action = logic.actions[i];

                      const conditionVars =  ["and", "or"].includes(action?.condition?.op) ? {op: action?.condition?.op, vars: action?.condition?.vars} : action?.condition;
                      const conditionOp = action?.condition?.op;
                      
                      const compareResults = ({ conditionVars }) => {
                        if (conditionVars && conditionVars?.vars?.length === 2) {
                          const fieldKey = conditionVars?.vars?.[0].value.slice(0, 7);
                          const optionType = conditionVars?.vars?.[1].type;
                          const expectedValue = conditionVars?.vars?.[1].value;
                          const actualValue = getData()?.forms?.[interactivequizKey]?.answers?.[fieldKey];
                          

                          const conditionType = conditionVars?.op;
                          const conditionTypeObj ={
                            is: optionType === "checkbox" ? actualValue.includes(expectedValue) : expectedValue == actualValue.join(" "),
                            isnot: optionType === "checkbox" ? !actualValue.includes(expectedValue) : expectedValue != actualValue.join(" "),
                            contains: actualValue.join(" ")?.includes(expectedValue),
                            notContain: !actualValue.join(" ")?.includes(expectedValue),
                            beginsWith: actualValue.join(" ")?.startsWith(expectedValue),
                            endsWith: actualValue.join(" ")?.endsWith(expectedValue),
                          }

                          return conditionTypeObj[conditionType];

                           
                      }
                      }
                    let resultConditionType = "";

                    const andCompareResults = (conditionVars) => {
                        let andResult = compareResults({ conditionVars: conditionVars?.vars?.[0] }) 
                        for (let i = 1; i < conditionVars?.vars?.length; i++) {
                            andResult = andResult && compareResults({ conditionVars: conditionVars?.vars?.[i] })             
                        }

                        return andResult;
                    }

                    const orCompareResults = (conditionVars) => {
                        const subCompare = (condVar) => {
                           return condVar.op === "and" ? andCompareResults(condVar) : compareResults({conditionVars: condVar});
                        }
                        let orResult = subCompare(conditionVars?.vars?.[0])
                        for (let i = 1; i < conditionVars?.vars?.length; i++) {
                            orResult = orResult || subCompare(conditionVars?.vars?.[i]) 
                        }
                        return orResult;
                    }

                    if(conditionOp === "and") {
                        resultConditionType = andCompareResults(conditionVars)
                    } 
                    else if(conditionOp === "or") {
                        resultConditionType = orCompareResults(conditionVars)
                        
                    }
                    else {
                        resultConditionType = compareResults({conditionVars}) 
                    }



                    if (resultConditionType || action?.condition?.op === "always") {
                              if (notFieldGoTo.includes(action?.details?.to?.type)) {
                                  if (action?.details?.to?.type === "redirect") {
                                      window.location.href = atomiApplyParams({ inputUrl: action?.details?.to?.value }) + (passParams ? getQueryOptions() : "");
                                      return;
                                  } else if (action?.details?.to?.type === "showDelayedSections") {
                                      runDelayedFunctions();
                                  } else if (action?.details?.to?.type === "scrollToId") {
                                      const targetId = action?.details?.to?.value;
                                      const targetElement = document.getElementById(targetId);
                                      targetElement.scrollIntoView({ behavior: "smooth" });
                                      window.scrollTo(0, targetElement.offsetTop);
                                  }
                              } else {
                                  const targetFieldKey = action?.details?.to?.value.slice(0, 7);
                                  const targetIndex = interactiveContObj[targetFieldKey];
  
                                  if (targetIndex !== undefined) {
                                      interactiveContainer.children[targetIndex].setAttribute('data-prev', currentSlide);
                                      currentSlide = targetIndex;
                                      actionTriggered = true;
                                  }
                              }

                              break;
  
                          }
                      
                      
                  }
  
  
                      if (!actionTriggered) {
                          if((currentSlide >= interactiveItems.length - 1) && !lastSlide) {
                              nextBtn.textContent = interactivequiz?.misc?.submitBtn || "Submit";
                              lastSlide = true;
                              return;
                          } else {
                              moveToImmediateNextSlide();
                          }
                      }
                  } else {
                      moveToImmediateNextSlide();
                  }
                  if(currentSlide >= interactiveItems.length - 1) {      
                      nextBtn.textContent = interactiveLogic?.find((logic) => logic?.ref === interactivequiz?.contents?.[currentSlide]?.contKey && logic?.actions?.length) ? interactivequiz?.misc?.nextBtn || "Ok" : interactivequiz?.misc?.submitBtn ||  "Submit";
                  } else {
                      nextBtn.textContent = interactivequiz?.misc?.nextBtn || "Next";
                  }  
                  for (let i = 0; i < interactiveItems.length; i++) {
                      if(i===currentSlide) {
                          interactiveContainer.children[currentSlide].classList.remove("atomicat-hidden")
                          interactiveContainer.children[currentSlide].classList.add("current-slide")
                      } else {
                          interactiveContainer.children[i].classList.add("atomicat-hidden")
                          interactiveContainer.children[i].classList.remove("current-slide")
                      }
                  }
  
                  const localAnswers = getData()?.forms[interactivequizKey]?.answers;
                  const localFieldTypes = getData()?.forms[interactivequizKey]?.fieldTypes;

                const fillInReplaceKeys = () => {
                    itemObjKeys.forEach((key) => {
                        const spanTags = document.querySelectorAll(".atomicat-interactivequiz-key-" + key);

                        spanTags.forEach(spanTag => {  
                            const keyValue = (localFieldTypes?.[key] === "checkbox" ?  localAnswers?.[key]?.map((ans) => interactiveOptions[key]?.misc?.content?.find((item) => item?.ref.slice(0, 7) === ans)?.text)?.join(" ") :  localAnswers?.[key]?.join(" ")) || "";
                            spanTag.innerHTML = keyValue;
                        })
                    });
                }
                
                  fillInReplaceKeys();

                //   fillUpOptions();
                  console.log("markQuestionViewed", item, quizElement.querySelector('.current-slide'))
                  if(quizElement.querySelector('.current-slide')){
                      markQuestionViewed({qid: interactivequiz.compKey, questionId: quizElement.querySelector('.current-slide')?.getAttribute("data-id")})
                  }
              }

  
              const fillUpOptions = () =>  interactiveOptionsArray.forEach((option) => {
                  if(interactiveOptions[option]) {
  
                      const optionEle= interactiveOptions[option];
                      const optionKey = optionEle.compKey.slice(0, 7);
                      const optionInput = document.querySelector(".atomicat-option-value-" + optionKey);
                      const savedAnswers =  getData()?.forms?.[interactivequizKey]?.answers?.[option] || [];
                      if(optionEle.misc.optionType === "checkbox" && optionEle?.misc?.content?.length) {
                          optionEle.misc.content.forEach((cont, i) => {
                              const checkbox = document.querySelector(".atomicat-checkbox-" + cont.ref.slice(0, 7));
                              const checkboxRef = cont.ref.slice(0, 7);
                              if(savedAnswers.includes(checkboxRef) && checkbox) {
                                  checkbox?.classList?.add("atomicat-chosen-option");
                              }
  
                              checkbox?.addEventListener("click", function(e) {
                                  setStartTime({qid: interactivequiz.compKey})
                                  const quizData = getData()
  
                                  if(checkbox?.classList?.contains("atomicat-chosen-option") && optionEle?.misc?.multiSelect) {
                                      checkbox?.classList?.remove("atomicat-chosen-option");
                                      quizData.forms[interactivequizKey].answers[option] = quizData?.forms?.[interactivequizKey]?.answers?.[option]?.filter((ans) => ans !== checkboxRef);
                                  } else {
                                      if(optionEle?.misc?.multiSelect) {
                                        quizData.forms[interactivequizKey].answers[option] = [...(quizData?.forms?.[interactivequizKey]?.answers?.[option] || []), checkboxRef];
                                      } else {
                                        quizData.forms[interactivequizKey].answers[option] = [checkboxRef];
                                      }
                                  }
                                    localStorage.setItem("atomicat-interactivequiz", JSON.stringify(quizData));
                                    if(!optionEle?.misc?.multiSelect) {
                                         moveToNextSlide({item: interactivequiz.contents[currentSlide]});
                                    }

                                  optionEle.misc.content.forEach((cont, i) => {
                                      const checkbox = document.querySelector(".atomicat-checkbox-" + cont.ref.slice(0, 7));
                                      if(quizData?.forms?.[interactivequizKey]?.answers?.[option]?.includes?.(cont.ref.slice(0, 7))) {
                                          checkbox?.classList?.add("atomicat-chosen-option");
                                      } else {
                                          checkbox?.classList?.remove("atomicat-chosen-option");
                                      }
                                  })
                                  
                                  
                              })
                          })
                      } else {
                          if(optionInput){
                              optionInput.value = savedAnswers?.[0] || "";
                              optionInput.addEventListener("keyup", function(e) {
                                  setStartTime({qid: interactivequiz.compKey})
                                  const value = e.target.value;
                                  const quizData = getData()
                                  quizData.forms[interactivequizKey].answers[option] = [value];
                                  localStorage.setItem("atomicat-interactivequiz", JSON.stringify(quizData));
                              })
                          }
                      }
                  }
              });
              fillUpOptions();
             
  
              nextBtn?.addEventListener("click", function(e) {
                  e.preventDefault();
                  setStartTime({qid: interactivequiz.compKey})
                  moveToNextSlide({item: interactivequiz.contents[currentSlide]});
              })
              const continueBtns = document?.querySelectorAll(".atomicat-interactivequiz-continue");
                if(continueBtns?.length) {
                console.log("continueBtns...", continueBtns, continueBtns?.length)
                    continueBtns.forEach(cbtn => {
                        console.log("cbtn...", cbtn)
                        cbtn.addEventListener("click", function(e) {
                            console.log("click... cbtn", cbtn)
                            setStartTime({qid: interactivequiz.compKey})
                            moveToNextSlide({item: interactivequiz.contents[currentSlide]});
                        })
                        cbtn.addEventListener("animationend", function() {
                            console.log("animationend... cbtn", cbtn)
                            setStartTime({qid: interactivequiz.compKey})
                            moveToNextSlide({item: interactivequiz.contents[currentSlide]});
                        });
                    })
                }
  
              prevBtn?.addEventListener("click", function(e) {
                  e.preventDefault();
                  if(currentSlide === 0) {
                      return;
                  }
                  nextBtn.textContent = interactivequiz?.misc?.nextBtn || "Next";
                  currentSlide = parseInt(interactiveContainer.children[currentSlide].getAttribute('data-prev'));
                  for (let i = 0; i < interactiveItems.length; i++) {
                      if(i===currentSlide) {
                          interactiveContainer.children[currentSlide].classList.remove("atomicat-hidden")
                          interactiveContainer.children[currentSlide].classList.add("current-slide")
                      } else {
                          interactiveContainer.children[i].classList.add("atomicat-hidden") 
                          interactiveContainer.children[i].classList.remove("current-slide") 
                      }
                  }
              })
          });
  
          function saveLead({qid, questionId, type}) {
              try {
                  const uid = document.body.getAttribute('id')?.replace("_", "");
                  const pid = document.body.getAttribute('data-page')?.replace("_", "");
                  const interactivequizKey = qid?.slice(0, 7);
                  const leadData = getData()?.forms?.[interactivequizKey];
                  const timeToComplete = (Date.now() - parseInt(leadData?.startTime || 0)) / 1000; // seconds
  
                  // Send data to backend
                  fetch('https://apidopro.atomicat-api.com/lytics/quiz/'+type, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ uid, pid, qid, leadData, timeToComplete, questionId })
                  })
                  .then(response => response.json())
                  .then(data => {
                      if (data.success) console.log("Lead saved successfully:", data.message);
                  })
                  .catch(error => console.error("Error saving lead:", error));
              } catch(error) {
                  console.log(error)
              }
          }
          function setStartTime({qid}) {
              try {
                  console.log(qid)
                  const localData = getData();
                  const quizId = qid?.slice(0, 7)
                  console.log(localData)
                  if (!localData?.forms?.[quizId]?.startTime) {
                      localData["forms"][quizId]["startTime"] = Date.now()
                      localStorage.setItem("atomicat-interactivequiz", JSON.stringify(localData));
                      saveLead({qid, type: "start"});
                  } else if (localData?.forms?.[quizId]?.inactiveTime) {
                      const currentStartTime = parseInt(localData?.forms?.[quizId]?.startTime, 10);
                      const inactiveTime = parseInt(localData?.forms?.[quizId]?.inactiveTime, 10);
                      const inactiveDuration = Date.now() - inactiveTime;
                      const adjustedStartTime = currentStartTime + inactiveDuration;
                      localData["forms"][quizId]["startTime"] = adjustedStartTime.toString()
                      delete localData["forms"][quizId]["inactiveTime"]
                      localStorage.setItem("atomicat-interactivequiz", JSON.stringify(localData));
                  }
              } catch(error) {
                  console.log(error)
              }
          }
          function handleUserInactive() {
              try {
                  const localData = getData();
                  if(Object.keys(localData?.forms || {})?.length > 0){
                      Object.keys(localData?.forms || {}).forEach(form => {
                          if(localData?.["forms"]?.[form]?.["startTime"]){
                              localData["forms"][form]["inactiveTime"] = Date.now().toString()
                          }
                      });
                      localStorage.setItem("atomicat-interactivequiz", JSON.stringify(localData));
                  }
              } catch(error) {
                  console.log(error)
              }
          }
          function markQuestionViewed({qid, questionId}) {
              try {
                  const localData = getData();
                  const quizId = qid?.slice(0, 7)
                  if(!localData?.forms?.[quizId]?.viewedQuestions?.length){
                      localData["forms"][quizId]["viewedQuestions"] = []
                  }
                  const viewedQuestions = localData?.forms?.[quizId]?.viewedQuestions;
  
                  if (!viewedQuestions?.includes(questionId)) {
                      viewedQuestions.push(questionId);
                      localStorage.setItem("atomicat-interactivequiz", JSON.stringify(localData));
                      saveLead({qid, questionId, type: "viewquestion"});
                  }
              } catch(error) {
                  console.log(error)
              }
          }
          function handleDrop() {
              try {
                  interactivequizList.forEach((interactivequiz) => {
                      const interactivequizKey = interactivequiz.compKey?.slice(0, 7);
                      const localData = getData() || {};
                      if(Object.keys(localData?.forms?.[interactivequizKey]?.answers || {})?.length > 0){
                          saveLead({qid: interactivequiz.compKey, type: "drop"});
                      }
                  });
              } catch(error) {
                  console.log(error)
              }
          }
          document.addEventListener("visibilitychange", () => {
              if (document.hidden) {
                  handleUserInactive();  // User leaves the tab
                  handleDrop()
              } else {
              }
          });
          document.addEventListener('mouseleave', function (e) {
              // Check if the mouse is near the top of the viewport
              if (e.clientY <= 0) {
                  handleDrop();
              }
          });
      } catch (error) {
          console.log(error);
      }
  })();