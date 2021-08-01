self.addEventListener('message', console.log);
setInterval(() => self.postMessage('I\'m alive!'), 1000);