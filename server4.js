const LBA = require('load-balancer-algorithm');
 
const weightRandomPool = [
  { host: "127.0.0.2:6061", weight: 2 },
  { host: "127.0.0.1:6062", weight: 3 },
  { host: "127.0.0.3:6063", weight: 5 },
];
const weightedList = []
const loadBalance = new LBA.WeightedRoundRobin(weightRandomPool);
 
for(let i = 0; i < 10; i++){
  const address = loadBalance.pick();
  console.log(address)
  weightedList.push(loadBalance.getWeight(address.host))
}
// [5, 5, 3, 5, 2, 3, 5, 2, 3, 5]
console.log(weightedList)