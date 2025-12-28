const timeNodes = Array.from(document.querySelectorAll("[data-time]"));

const totalTimeInSecs = timeNodes
  .map((node) => {
    const [mins, secs] = node.dataset.time.split(":");
    const totalTimeInSecs = Number(mins) * 60 + Number(secs);
    return totalTimeInSecs;
  })
  .reduce((total, vidSeconds) => {
    return total + vidSeconds; //made a mistake here, always forgetting that I have to use return for the array methods to work
  }, 0);

// const timeInHrs = Math.floor(totalTimeInSecs / 3600);
// const timeInMins = Math.floor((totalTimeInSecs - timeInHrs * 3600) / 60);
// const timeInSecs = Math.floor(
//   totalTimeInSecs - timeInHrs * 3600 - timeInMins * 60
// );

const timeInHrs = Math.floor(totalTimeInSecs / 3600);
const timeInMins = Math.floor((totalTimeInSecs % 3600) / 60);
const timeInSecs = Math.floor(timeInMins % 60);

console.log(`Total time: 0${timeInHrs}:${timeInMins}:${timeInSecs}`);
