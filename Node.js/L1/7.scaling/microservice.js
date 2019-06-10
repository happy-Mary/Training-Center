
console.log('Microservice is running...');
console.log(`Waiting for: ${process.env.WAIT}ms`);

setTimeout(() => console.log('Done!'), process.env.WAIT);