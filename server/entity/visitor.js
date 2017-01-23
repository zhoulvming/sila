var visitor = {
  clientHash: '',
  isNewClient: 0,
  lastVisitTime: '',
  accessTimes: {
    dayTimes: 0,
    weekTimes: 0,
    monthTimes: 0,
    yearTimes: 0,
    totleTimes: 0
  },
  clientInfo: {
    browserType: '',
    browserVersion: '',
    os: '',
    screen: '',
    ip: ''
  },
  isNewSession: 0,
  sessionID: ''
}

module.exports = visitor