module.exports = {
  async1: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('real data 1'), 1000);
    });
  },

  async2: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('real data 2'), 1000);
    });
  }
};
